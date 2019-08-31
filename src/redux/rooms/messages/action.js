import room from 'api/room'

export const LOAD_MESSAGES = 'LOAD_MESSAGES'
export const LOAD_MESSAGES_FULFILLED = 'LOAD_MESSAGES_FULFILLED'
export const CREATE_MESSAGE = 'CREATE_MESSAGE'
export const CREATE_MESSAGE_PENDING = 'CREATE_MESSAGE_PENDING'
export const CREATE_MESSAGE_FULFILLED = 'CREATE_MESSAGE_FULFILLED'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'

export const SET_MESSAGE = 'SET_MESSAGE'
export const SET_MESSAGES = 'SET_MESSAGES'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const READ_MESSAGES = 'READ_MESSAGES'

/**
 * Websocket actions. Receive data
 */

const receive = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
})

/**
 * Async actions. Making API requests
 */

const loadMany = (room_id, params) => ({
  type: LOAD_MESSAGES,
  payload: room.messages.loadMany(room_id, params)
})

const create = (room_id, form) => ({
  type: CREATE_MESSAGE,
  payload: room.messages.create(room_id, form),
  meta: { room_id, form }
})

/**
 * Sync actions. Updating store
 */

const setMany = messages => ({
  type: SET_MESSAGES,
  payload: messages,
})

const set = message => ({
  type: SET_MESSAGE,
  payload: message,
})

const remove = message_id => ({
  type: REMOVE_MESSAGE,
  payload: message_id,
})

export default {
  loadMany,
  create,
  receive,
  set,
  setMany,
  remove,
}
