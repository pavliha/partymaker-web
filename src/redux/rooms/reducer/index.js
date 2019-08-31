import { combineReducers } from 'redux'
import entities from './entities'
import status from './status'
import messages from '../messages/reducer'
import orders from '../orders/reducer'

export default combineReducers({
  messages,
  orders,
  entities,
  status,
})
