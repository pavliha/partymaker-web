import { createSelector } from 'reselect/lib/index'

const all = (places) => {
  return places
}

export default createSelector(
  state => state.places.entities,
  all,
)
