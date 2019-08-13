import {
  ACTIVATE_USER_FULFILLED,
  LOGIN_FACEBOOK_USER_FULFILLED,
  LOGIN_GOOGLE_USER_FULFILLED,
  LOGIN_USER_FULFILLED,
  REGISTER_USER_FULFILLED
} from './action'

const initialState = {
  user_id: null,
  email: null,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIVATE_USER_FULFILLED:
    case LOGIN_GOOGLE_USER_FULFILLED:
    case LOGIN_FACEBOOK_USER_FULFILLED:
    case REGISTER_USER_FULFILLED:
    case LOGIN_USER_FULFILLED:
      return {
        ...state,
        user_id: payload.user.id
      }

    default:
      return state
  }
}

export default authReducer
