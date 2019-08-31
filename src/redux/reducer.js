import { combineReducers } from 'redux'
import auth from './auth/reducer'
import users from './users/reducer'
import rooms from './rooms/reducer'
import places from './places/reducer'
import assets from './assets/reducers'
import accounts from './accounts/reducers'
import entertainments from './entertainments/reducer'

export default combineReducers({
  auth,
  users,
  rooms,
  places,
  assets,
  accounts,
  entertainments,
})
