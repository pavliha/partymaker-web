import { createSelector } from 'reselect'
import { select } from 'src/redux'

const exist = (room_id) => (users, auth_id) => {
  const user = users[auth_id]
  return user && user.pivot?.room_id === room_id
}

export default (state, room_id) =>
  createSelector(
    state => select.users.all(state),
    state => state.auth.user_id,
    exist(parseInt(room_id)),
  )(state)
