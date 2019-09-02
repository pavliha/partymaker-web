import auth from 'api/auth'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS_ONLINE = 'SET_USERS_ONLINE'

export const LOAD_USER = 'LOAD_USER'
export const LOAD_USER_FULFILLED = 'LOAD_USER_FULFILLED'

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED'
export const DETACH_USER_FROM_ROOM = 'DETACH_USER_FROM_ROOM'

/**
 * Async actions. Making API requests
 */

const load = (user_id) => ({
  type: LOAD_USER,
  payload: auth.user.load(user_id)
})

const update = (user_id, form) => ({
  type: UPDATE_USER,
  payload: auth.user.update(user_id, form)
})

/**
 * Sync actions. Updating store
 */

const setMany = users => ({
  type: SET_USERS,
  payload: users,
})

const set = user => ({
  type: SET_USER,
  payload: user,
})

const remove = user_id => ({
  type: REMOVE_USER,
  payload: user_id,
})

const online = (users_ids) => ({
  type: SET_USERS_ONLINE,
  payload: users_ids,
})

const detach = (user_id, room_id) => ({
  type: DETACH_USER_FROM_ROOM,
  payload: { user_id, room_id },
})

export default {
  load,
  update,
  set,
  setMany,
  remove,
  online,
  detach,
}
