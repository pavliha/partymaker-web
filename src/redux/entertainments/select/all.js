import { createSelector } from 'reselect'

const all = (entertainments) => entertainments

export default createSelector(
  state => Object.values(state.entertainments.entities),
  all
)
