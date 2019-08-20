import { SET_ROOMS } from '../action'
import arrayToObject from 'utils/arrayToObject'

export default (state = {}, { type, payload }) => {
  switch (type) {

    case SET_ROOMS:
      return {
        ...state,
        ...arrayToObject(payload)
      }

    default:
      return state
  }
}
