import { createSelector } from 'reselect'
import { select } from 'src/redux'

const current = (room_id) => (
  rooms,
  places,
  users,
  messages,
  totalMessages,
) => {
  const room = rooms[room_id]

  if (!room) return null

  return {
    ...room,
    place: places.find(p => p.id === room.place_id),
    guests: users.filter(u => u?.room_id === room_id),
    messages: messages.filter(m => m.room_id === room_id),
    totalMessages,
  }
}

export default (state, room_id) =>
  createSelector(
    state => state.rooms.entities,
    state => select.places.all(state),
    state => select.users.all(state),
    state => select.rooms.messages.all(state),
    state => state.rooms.status.messages.total,
    current(parseInt(room_id)),
  )(state)
