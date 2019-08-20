import { arrayToObject, fromJWT } from 'utils'
import Storage from 'services/Storage'
import {
  SET_USER,
  SET_USERS,
  UPDATE_USER_FULFILLED,
  LOAD_USER_FULFILLED
} from '../action'

const user = fromJWT(Storage.get('token'))
const initialState = user ? { [user.id]: user } : {}

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_USER_FULFILLED:
    case UPDATE_USER_FULFILLED:
    case SET_USER:
      return {
        ...state,
        [payload.id]: {
          ...payload,
        },
      }

    case SET_USERS:
      return {
        ...state,
        ...arrayToObject(payload),
      }

    default:
      return state
  }
}

export default usersReducer
