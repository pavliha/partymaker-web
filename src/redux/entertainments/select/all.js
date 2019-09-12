import { createSelector } from 'reselect'

const all = (entertainments) => entertainments
  .sort((prev, next) => prev.order - next.order)

export default createSelector(
  state => Object.values(state.entertainments.entities),
  all
)
