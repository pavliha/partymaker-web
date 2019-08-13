import auth from 'api/Auth'
import { decodeToken } from 'src/redux/auth/interceptors'

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

const forgot = form => ({
  type: FORGOT_PASSWORD,
  payload: auth.password.forgot(form),
  meta: form,
})

const reset = form => ({
  type: RESET_PASSWORD,
  payload: auth.password.reset(form),
  intercept: decodeToken,
})

const update = form => ({
  type: UPDATE_PASSWORD,
  payload: auth.password.update(form),
  intercept: decodeToken
})

export default {
  forgot,
  reset,
  update,
}
