import { createSelector } from 'reselect'

const listRooms = (rooms) =>
  rooms
    .sort((prev, next) => next.updated_at - prev.updated_at)
    .reverse()

export default createSelector(
  state => Object.values(state.rooms.entities),
  listRooms,
)
