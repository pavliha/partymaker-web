import { LOAD_ROOMS_FULFILLED } from '../action'
import arrayToObject from 'utils/arrayToObject'

export default (state = {}, { type, payload }) => {
  switch (type) {

    case LOAD_ROOMS_FULFILLED:
      return {
        ...state,
        ...arrayToObject(payload.data)
      }

    default:
      return state
  }
}
