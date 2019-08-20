import { LOGIN_USER_FULFILLED, LOGOUT_USER, REGISTER_USER_FULFILLED } from './action'
import { fromJWT } from 'utils'
import Storage from 'services/Storage'

const token = Storage.get('token')

const initialState = {
  user_id: fromJWT(token)?.id,
  token,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case REGISTER_USER_FULFILLED:
    case LOGIN_USER_FULFILLED:
      return {
        ...state,
        token: payload.token,
        user_id: fromJWT(payload.token)?.id,
      }

    case LOGOUT_USER:
      return {
        ...state,
        user_id: null,
      }

    default:
      return state
  }
}

export default authReducer
