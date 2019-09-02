import { DETACH_USER_FROM_ROOM, SET_USER, SET_USERS } from '../action'
import { arrayToObject, fromJWT } from 'utils'
import Storage from 'services/Storage'

const user = fromJWT(Storage.get('token'))
const initialState = user ? { [user.id]: user } : {}

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_USER:
      return {
        ...state,
        [payload.id]: {
          ...payload,
          pivot: payload?.pivot || state[payload.id]?.pivot,
        },
      }

    case SET_USERS:
      return {
        ...state,
        ...arrayToObject(payload),
      }

    case DETACH_USER_FROM_ROOM:
      return {
        ...state,
        [payload.user_id]: {
          ...state[payload.user_id],
          pivot: {
            ...state[payload.user_id].pivot,
            room_id: null,
          }
        },
      }

    default:
      return state
  }
}

export default usersReducer
