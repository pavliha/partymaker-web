import auth from 'api/auth'
import { decodeToken } from './interceptors'

export const ACTIVATE_USER = 'ACTIVATE_USER'
export const ACTIVATE_USER_FULFILLED = 'ACTIVATE_USER_FULFILLED'
export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED'
export const LOGIN_GOOGLE_USER = 'LOGIN_GOOGLE_USER'
export const LOGIN_GOOGLE_USER_FULFILLED = 'LOGIN_GOOGLE_USER_FULFILLED'
export const LOGIN_FACEBOOK_USER = 'LOGIN_FACEBOOK_USER'
export const LOGIN_FACEBOOK_USER_FULFILLED = 'LOGIN_FACEBOOK_USER_FULFILLED'
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

const activate = hash => ({
  type: ACTIVATE_USER,
  payload: auth.activate(hash),
  intercept: decodeToken
})

const google = Guser => ({
  type: LOGIN_GOOGLE_USER,
  payload: auth.google(Guser),
  intercept: decodeToken
})

const facebook = FBUser => ({
  type: LOGIN_FACEBOOK_USER,
  payload: auth.facebook(FBUser),
  intercept: decodeToken
})

const logout = (user) => ({
  type: LOGOUT_USER,
  payload: auth.logout(user),
})

export default {
  register,
  login,
  activate,
  google,
  facebook,
  logout,
}
