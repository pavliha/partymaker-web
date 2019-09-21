import { SET_COMMENTS } from '../action'
import arrayToObject from 'utils/arrayToObject'

export default (state = {}, { type, payload }) => {
  switch (type) {

    case SET_COMMENTS:
      return {
        ...state,
        ...arrayToObject(payload)
      }

    default:
      return state
  }
}
