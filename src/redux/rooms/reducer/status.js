import { LOAD_MESSAGES_FULFILLED } from '../messages/action'

const initialState = {
  messages: {
    page: 1,
    total: 0,
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_MESSAGES_FULFILLED:
      return {
        ...state,
        messages: {
          page: payload.page,
          total: payload.total
        },
      }

    default:
      return state
  }
}
