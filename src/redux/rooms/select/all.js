import { createSelector } from 'reselect'

const listRooms = (rooms, places) =>
  rooms
    .map(room => ({
      ...room,
      place: places[room.place_id],
      guest_count: room.__meta__?.guest_count
    }))
    .sort((prev, next) => next.updated_at - prev.updated_at)
    .reverse()

export default createSelector(
  state => Object.values(state.rooms.entities),
  state => state.places.entities,
  listRooms,
)
