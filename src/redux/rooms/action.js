import api from 'api'
import messages from './messages/action'
import guests from './guests/action'
import orders from './orders/action'

export const LOAD_ROOMS = 'LOAD_ROOMS'
export const LOAD_ROOMS_FULFILLED = 'LOAD_ROOMS_FULFILLED'
export const LOAD_ROOM = 'LOAD_ROOM'
export const LOAD_ROOM_FULFILLED = 'LOAD_ROOM_FULFILLED'
export const CREATE_ROOM = 'CREATE_ROOM'
export const CREATE_ROOM_FULFILLED = 'CREATE_ROOM_FULFILLED'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const UPDATE_ROOM_FULFILLED = 'UPDATE_ROOM_FULFILLED'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const LEAVE_ROOM_FULFILLED = 'LEAVE_ROOM_FULFILLED'
export const SET_ROOMS = 'SET_ROOMS'
export const SET_ROOM = 'SET_ROOM'
export const REMOVE_ROOM = 'REMOVE_ROOM'
export const SUBSCRIBE = 'SUBSCRIBE'
export const UNSUBSCRIBE = 'UNSUBSCRIBE'
export const JOIN_ROOM = 'JOIN_ROOM'
export const JOIN_ROOM_FULFILLED = 'JOIN_ROOM_FULFILLED'

const subscribe = (room_id) => ({
  type: SUBSCRIBE,
  connect_socket: { room_id }
})

const unsubscribe = () => ({
  type: UNSUBSCRIBE,
  disconnect_socket: true,
})

const loadMany = () => ({
  type: LOAD_ROOMS,
  payload: api.auth.rooms.loadMany()
})

const load = (room_id) => ({
  type: LOAD_ROOM,
  payload: api.room.load(room_id)
})

const create = (form) => ({
  type: CREATE_ROOM,
  payload: api.room.create(form)
})

const update = (id, form) => ({
  type: UPDATE_ROOM,
  payload: api.room.update(id, form)
})

const join = (room_id) => ({
  type: JOIN_ROOM,
  payload: api.room.join(room_id),
  meta: { room_id }
})

const leave = (room_id) => ({
  type: LEAVE_ROOM,
  payload: api.room.leave(room_id),
  meta: { room_id }
})

const setMany = rooms => ({
  type: SET_ROOMS,
  payload: rooms,
})

const set = room => ({
  type: SET_ROOM,
  payload: room,
})

const remove = room_id => ({
  type: REMOVE_ROOM,
  payload: room_id,
})

export default {
  guests,
  messages,
  orders,
  subscribe,
  unsubscribe,
  loadMany,
  load,
  create,
  update,
  join,
  leave,
  set,
  setMany,
  remove,
}
