import Http from 'services/Http'
import normalize from 'normalize-api'

const entertainment = {

  async loadMany() {
    const entertainments = await Http.get(`/entertainments`)
    return normalize(entertainments, 'entertainments')
  },

  async load(entertainment_id) {
    const entertainment = await Http.get(`/entertainments/${entertainment_id}`)
    return normalize(entertainment, 'entertainments')
  },
}

export default entertainment
