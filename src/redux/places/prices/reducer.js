import { combineReducers } from 'redux'
import c from 'src/redux/constants'
import { arrayToObject } from 'src/utils'

const entities = (state = {}, { type, payload }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.prices)
      }

    default:
      return state
  }
}

export default combineReducers({
  entities,
})
