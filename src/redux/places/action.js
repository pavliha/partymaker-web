import place from 'api/place'
import c from 'src/redux/constants'

/**
 * Async actions. Making API requests
 */

const load = place_id => ({
  type: c.LOAD_PLACE,
  payload: place.load(place_id),
})

export default {
  load,
}
