import { SET_USERS_ONLINE } from '../action'

const initialState = {
  online: []
}

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_USERS_ONLINE:
      return {
        ...state,
        online: payload,
      }

    default:
      return state
  }
}

export default usersReducer
