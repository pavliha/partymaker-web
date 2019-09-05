import { createSelector } from 'reselect'
import { select } from 'src/redux'

const selectRoom = (state, order_id) => {
  const order = state.orders.entities[order_id]
  if (!order) return []
  return select.rooms.current(state, order.room_id)
}

const current = order_id => (orders, room) => {
  const order = orders[order_id]
  if (!order) return null
  return {
    ...order,
    room: room
  }
}

export default (state, order_id) =>
  createSelector(
    state => state.orders.entities,
    state => selectRoom(state, order_id),
    current(parseInt(order_id)),
  )(state)
