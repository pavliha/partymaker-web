import { combineReducers } from 'redux'
import entities from './entities'
import status from './status'
import messages from '../messages/reducer'

export default combineReducers({
  messages,
  entities,
  status,
})
