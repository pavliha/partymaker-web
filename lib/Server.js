const express = require('express')
const Webpack = require('./Webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()

class Server {

  constructor(webpackConfig) {
    this.config = webpackConfig
  }

  server(path) {
    return (require(path).default)()
  }

  async development() {
    console.info('Starting development build. Sever side rendering is disabled!')
    const webpack = new Webpack(this.config)
    console.info('Building server for the first time')
    await webpack.buildServer()
    console.info('Start watching client changes...')
    app.use(webpackDevMiddleware(webpack.clientCompiler, {
      publicPath: '/',
      writeToDisk: false,
      serverSideRender: true,
      stats: webpack.serverConfig.stats,
    }))
    app.use(webpackHotMiddleware(webpack.clientCompiler))
    app.use(express.static(webpack.publicPath))
    app.use(this.server(webpack.serverPath))
  }

  async production() {
    const webpack = new Webpack(this.config)
    await webpack.buildAll()
    app.use(express.static(webpack.publicPath))
    console.info(`Serving content from ${webpack.publicPath} `)
    app.use(this.server(webpack.serverPath))
  }

  async start(stage) {
    const PORT = process.env.PORT
    if (!PORT) throw 'PORT is not defined in .env'
    if (stage.isDevelop) await this.development()
    if (stage.isTesting) await this.production()
    if (stage.isProd) await this.production()

    app.listen(PORT, () => console.info(`Listening on http://localhost:${PORT}`))
  }
}

module.exports = Server
