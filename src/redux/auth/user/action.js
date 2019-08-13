import auth from 'api/Auth'
import account from './account/action'
import { updateUser } from 'src/redux/auth/interceptors'

export const LOAD_AUTH_USER = 'LOAD_AUTH_USER'
export const LOAD_AUTH_USER_FULFILLED = 'LOAD_AUTH_USER_FULFILLED'

export const UPDATE_AUTH_USER = 'UPDATE_AUTH_USER'
export const UPDATE_AUTH_USER_FULFILLED = 'UPDATE_AUTH_USER_FULFILLED'

/**
 * Async actions. Making API requests
 */

const load = () => ({
  type: LOAD_AUTH_USER,
  payload: auth.user.load(),
  intercept: updateUser
})

const update = (form) => ({
  type: UPDATE_AUTH_USER,
  payload: auth.user.update(form),
  intercept: updateUser
})

export default {
  account,
  load,
  update,
}
