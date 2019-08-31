import { SET_ORDER, SET_ORDERS, REMOVE_ORDER } from '../action'
import arrayToObject from 'utils/arrayToObject'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SET_ORDERS:
      return {
        ...state,
        ...arrayToObject(payload)
      }

    case SET_ORDER:
      return {
        ...state,
        [payload.id]: payload,
      }

    case REMOVE_ORDER: {
      const orders = { ...state }
      delete orders[payload]

      return orders
    }

    default:
      return state
  }
}
