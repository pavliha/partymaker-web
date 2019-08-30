import { createSelector } from 'reselect'

const exist = (room_id) => (users, auth_id) => {
  const user = users[auth_id]
  return user && user.pivot?.room_id === room_id
}

export default (state, room_id) =>
  createSelector(
    state => state.users.entities,
    state => state.auth.user_id,
    exist(parseInt(room_id)),
  )(state)
