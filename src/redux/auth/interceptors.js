import Auth from 'services/Auth'
import { actions } from 'src/redux'

export const decodeToken = async ({ payload, ...rest }, dispatch) => {
  const user = Auth.user(payload.token)
  dispatch(actions.users.set(user))

  return ({
    ...rest,
    payload: {
      ...payload, user,
    }
  })
}

export const updateUser = ({ payload, ...rest }, dispatch) => {
  const user = Auth.user(payload.token)

  dispatch(actions.users.set(user))
}

export const updateAccount = (action, dispatch) => {
  dispatch(actions.users.accounts.set(user))
}
