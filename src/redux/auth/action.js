import auth from 'api/auth'
import user from './user/action'
import password from './password/action'

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED'

export const LOGOUT_USER = 'LOGOUT_USER'

/**
 * Async actions. Making API requests
 */

const register = form => ({
  type: REGISTER_USER,
  payload: auth.register(form),
})

const login = form => ({
  type: LOGIN_USER,
  payload: auth.login(form),
})

const logout = () => ({
  type: LOGOUT_USER,
  payload: auth.logout(),
})

export default {
  user,
  password,

  register,
  login,
  logout,
}
