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
    place: places[room.place_id],
    guests: users.filter(u => u.pivot?.room_id === room_id),
    messages: messages.filter(m => m.room_id === room_id),
    totalMessages,
  }
}

export default (state, room_id) =>
  createSelector(
    state => state.rooms.entities,
    state => state.places.entities,
    state => select.users.all(state),
    state => select.messages.all(state),
    state => state.rooms.status.messages.total,
    current(parseInt(room_id)),
  )(state)

