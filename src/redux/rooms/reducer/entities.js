import { SET_ROOMS, REMOVE_ROOM } from '../action'
import arrayToObject from 'utils/arrayToObject'

export default (state = {}, { type, payload }) => {
  switch (type) {

    case SET_ROOMS:
      return {
        ...state,
        ...arrayToObject(payload)
      }

    case REMOVE_ROOM: {
      const rooms = { ...state }
      delete rooms[payload]

      return rooms
    }

    default:
      return state
  }
}
