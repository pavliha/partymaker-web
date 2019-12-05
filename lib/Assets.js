import React from 'react'
import { ServerStyleSheets } from '@material-ui/styles'
import { Helmet } from 'react-helmet'
import { ChunkExtractorManager } from '@loadable/server'
import Loadable from 'lib/Loadable'

class Assets {

  constructor(stats) {
    this._loadable = new Loadable(stats)
    this._helmet = Helmet.renderStatic()
    this._sheets = new ServerStyleSheets()
  }

  get title() {
    return this._helmet.title.toString()
  }

  get meta() {
    return this._helmet.meta.toString()
  }

  get links() {
    return this._helmet.link.toString() + this._loadable.links
  }

  get styles() {
    return this._loadable.styles + `\n<style id="jss-server-side">${this._sheets.toString()}</style>`
  }

  get scripts() {
    return this._loadable.scripts
  }

  collect(jsx) {
    return this._sheets.collect(
      <ChunkExtractorManager extractor={this._loadable.extractor}>
        {jsx}
      </ChunkExtractorManager>,
    )
  }
}

export default Assets
