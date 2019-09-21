import { createSelector } from 'reselect/lib/index'

const all = (comments, users) =>
  comments.map(comment => ({
    ...comment,
    user: users[comment.user_id],
  }))

export default createSelector(
  state => Object.values(state.places.comments.entities),
  state => state.users.entities,
  all,
)
