import { createSelector } from 'reselect'

const all = (orders) => orders

export default createSelector(
  state => Object.values(state.orders.entities),
  all,
)
