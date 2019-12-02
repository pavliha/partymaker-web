import React from 'react'
import { renderToString } from 'react-dom/server'
import Loadable from 'lib/Loadable'
import Assets from 'lib/Assets'

class Template {

  constructor(jsx) {
    this.loadable = new Loadable('./dist/public/loadable-stats.json')
    this.assets = new Assets(this.loadable)
    this.jsx = jsx
  }

  render(callback) {
    const jsx = this.assets.collect(this.jsx)
    const html = renderToString(jsx)

    return callback(html, this.assets)
  }

}

export default Template
