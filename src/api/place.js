import Http from 'services/Http'
import normalize from 'normalize-api'

const place = {

  async loadMany() {
    const places = await Http.get(`/places`)
    return normalize(places, 'places')
  },

  async load(place_id) {
    const place = await Http.get(`/places/${place_id}`)
    return normalize(place, 'places')
  },

}

export default place
