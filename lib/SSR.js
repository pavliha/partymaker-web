import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Assets from 'lib/Assets'

class SSR {

  constructor({ url, stats }) {
    this.assets = new Assets(stats)
    this.context = {}
    this.url = url
  }

  render(jsx) {
    const jsxWithStyles = this.assets.collect(jsx)
    const html = renderToString(
      <StaticRouter context={this.context} location={this.url}>
        {jsxWithStyles}
      </StaticRouter>,
    )

    return [html, this.assets]
  }
}

export default SSR
