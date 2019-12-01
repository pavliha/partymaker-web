const express = require('express')
const Webpack = require('./Webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()

const log = (message) => {
  console.log(' ')
  console.info(message)
  console.log(' ')
}

class Server {

  constructor(webpackConfig) {
    this.config = webpackConfig
    this.options = {
      setHeaders(res) {
        res.set('x-timestamp', Date.now())
        res.header('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
      },
    }
  }

  server(path) {
    return (require(path).default)()
  }

  use(fn) {
    app.use(fn)
  }

  async development() {
    log('Starting development build. Sever side rendering is disabled!')
    const webpack = new Webpack(this.config)
    log('Building server for the first time')
    await webpack.buildServer()
    log('Start watching client changes...')
    this.use(webpackDevMiddleware(webpack.clientCompiler, {
      publicPath: '/',
      writeToDisk: false,
      stats: webpack.serverConfig.stats,
    }))
    this.use(webpackHotMiddleware(webpack.clientCompiler))
    this.use(express.static(webpack.publicPath, this.options))
    this.use(this.server(webpack.serverPath))
  }

  async production() {
    const webpack = new Webpack(this.config)
    await webpack.buildAll()
    this.use(express.static(webpack.publicPath, this.options))
    log(`Serving content from ${webpack.publicPath} `)
    this.use(this.server(webpack.serverPath))
  }

  async start(stage) {
    const PORT = process.env.PORT || 3000
    if (stage.isDevelop) await this.development()
    if (stage.isTesting) await this.production()
    if (stage.isProd) await this.production()

    app.listen(PORT, () => log(`Listening on http://localhost:${PORT}`))
  }
}

module.exports = Server
