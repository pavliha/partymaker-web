import room from 'api/room'

export const LOAD_ROOMS = 'LOAD_ROOMS'
export const LOAD_ROOMS_FULFILLED = 'LOAD_ROOMS_FULFILLED'

const loadMany = () => ({
  type: LOAD_ROOMS,
  payload: room.loadMany()
})

export default {
  loadMany,
}
