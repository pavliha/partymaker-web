import auth from 'api/auth'
import { decodeToken } from './interceptors'

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED'
export const LOGOUT_USER = 'LOGOUT_USER'


const register = form => ({
  type: REGISTER_USER,
  payload: auth.register(form),
  intercept: decodeToken
})

const login = form => ({
  type: LOGIN_USER,
  payload: auth.login(form),
  intercept: decodeToken
})

const logout = (user) => ({
  type: LOGOUT_USER,
  payload: auth.logout(user),
})

export default {
  register,
  login,
  logout,
}
