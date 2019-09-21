import { createSelector } from 'reselect'
import { select } from 'src/redux'

const current = (place_id) => (places, comments, photos) => {
  const place = places[place_id]
  return {
    ...place,
    photos: photos.filter(p => p.place_id === place.id),
    comments: comments.filter(c => c.place_id === place.id)
  }
}

export default (state, place_id) =>
  createSelector(
    state => state.places.entities,
    state => select.places.comments.all(state),
    state => Object.values(state.places.photos.entities),
    current(parseInt(place_id)),
  )(state)
