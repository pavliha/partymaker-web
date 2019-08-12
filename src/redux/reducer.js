import { combineReducers } from 'redux'
import auth from './auth/reducer'
import users from './users/reducers'

export default combineReducers({
  auth,
  users,
})
