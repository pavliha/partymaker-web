import { createSelector } from 'reselect'

const current = (room_id) => (rooms, places, users) => {
  const room = rooms[room_id]

  if (!room) return null

  return {
    ...room,
    place: places[room.place_id],
    guests: users.filter(u => u.pivot?.room_id === room_id)
  }
}

export default (state, room_id) =>
  createSelector(
    state => state.rooms.entities,
    state => state.places.entities,
    state => Object.values(state.users.entities),
    current(parseInt(room_id)),
  )(state)

