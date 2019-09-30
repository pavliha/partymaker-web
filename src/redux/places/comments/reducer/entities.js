import { SET_COMMENTS } from '../action'
import arrayToObject from 'utils/arrayToObject'

export default (state = {}, { type, payload }) => {
  switch (type) {

    case SET_COMMENTS:
      return {
        ...state,
        ...arrayToObject(payload.map(c => ({
          ...c,
          place_id: Number(c.place_id)
        })))
      }

    default:
      return state
  }
}
