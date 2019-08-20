import {
  SET_USER,
  SET_USERS,
  UPDATE_USER_FULFILLED,
  LOAD_USER_FULFILLED
} from '../action'
import { arrayToObject } from 'utils'

const usersReducer = (state = {}, { type, payload }) => {
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
