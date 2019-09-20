import { createSelector } from 'reselect'

const current = (place_id) => (places) => {
  return places[place_id]
}

export default (state, place_id) =>
  createSelector(
    state => state.places.entities,
    current(parseInt(place_id)),
  )(state)
