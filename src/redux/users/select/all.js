import { createSelector } from 'reselect'

const all = (users, online) =>
  users
    .map(user => ({
      ...user,
      is_online: !!online.find(id => id === user.id)
    }))

export default createSelector(
  state => Object.values(state.users.entities),
  state => state.users.status.online,
  all,
)
