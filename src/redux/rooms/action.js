import room from 'api/room'
import messages from './messages/action'

export const LOAD_ROOMS = 'LOAD_ROOMS'
export const LOAD_ROOMS_FULFILLED = 'LOAD_ROOMS_FULFILLED'
export const LOAD_ROOM = 'LOAD_ROOM'
export const LOAD_ROOM_FULFILLED = 'LOAD_ROOM_FULFILLED'
export const SET_ROOMS = 'SET_ROOMS'
export const SET_ROOM = 'SET_ROOM'
export const REMOVE_ROOM = 'REMOVE_ROOM'

const loadMany = () => ({
  type: LOAD_ROOMS,
  payload: room.loadMany()
})

const load = (room_id) => ({
  type: LOAD_ROOM,
  payload: room.load(room_id)
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
  messages,
  loadMany,
  load,
  set,
  setMany,
  remove,
}
