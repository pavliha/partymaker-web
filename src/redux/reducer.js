import { combineReducers } from 'redux'
import places from './places/reducer'
import entertainments from './entertainments/reducer'

export default combineReducers({
  places,
  entertainments,
})
