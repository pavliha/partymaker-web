import { combineReducers } from 'redux'
import c from 'src/redux/constants'
import arrayToObject from 'utils/arrayToObject'

const entities = (state = {}, { type, payload }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.photos)
      }

    default:
      return state
  }
}

export default combineReducers({
  entities,
})
