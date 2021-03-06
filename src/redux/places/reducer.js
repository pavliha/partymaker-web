import { combineReducers } from 'redux'
import photos from './photos/reducer'
import contacts from './contacts/reducer'
import requirements from './requirements/reducer'
import additional_services from './additional_services/reducer'
import prices from './prices/reducer'
import c from 'src/redux/constants'
import arrayToObject from 'utils/arrayToObject'

const entities = (state = {}, { type, payload }) => {
  switch (type) {

    case c.SET_ENTITIES:
      return {
        ...state,
        ...arrayToObject(payload.places),
      }

    default:
      return state
  }
}

export default combineReducers({
  prices,
  requirements,
  additional_services,
  photos,
  contacts,
  entities,
})
