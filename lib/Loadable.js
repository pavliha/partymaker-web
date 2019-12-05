import { ChunkExtractor } from '@loadable/server'
import path from 'path'

class Loadable {
  constructor(stats) {
    this._extractor = new ChunkExtractor({
      entrypoints: ['client'],
      stats,
      statsFile: path.resolve('./dist/public/loadable-stats.json'),
    })
  }

  get extractor() {
    return this._extractor
  }

  get scripts() {
    return this._extractor.getScriptTags()
  }

  get styles() {
    return this._extractor.getStyleTags()
  }

  get links() {
    return this._extractor.getLinkTags()
  }
}

export default Loadable
