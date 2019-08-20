import { combineReducers } from 'redux'
import auth from './auth/reducer'
import users from './users/reducer'
import rooms from './rooms/reducer'

export default combineReducers({
  auth,
  users,
  rooms,
})
