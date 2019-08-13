import { SET_ACCOUNT, SET_ACCOUNTS } from '../action'
import arrayToObject from 'utils/arrayToObject'

const accountsReducer = (state = {}, { type, payload }) => {
  switch (type) {

    case SET_ACCOUNT:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload
        },
      }

    case SET_ACCOUNTS:
      return {
        ...state,
        ...arrayToObject(payload),
      }

    default:
      return state
  }
}

export default accountsReducer
