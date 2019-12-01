import { createSelector } from 'reselect'

const all = createSelector(
  state => Object.values(state.places.entities),
  state => state.entertainments.entities,

  (places, entertainments) =>
    places.map(place => ({
      ...place,
      entertainment: entertainments[place.entertainment_id],
    })),
)

const current = (state, place_id) =>
  createSelector(
    state => state.places.entities,
    state => state.entertainments.entities,
    state => Object.values(state.places.photos.entities),
    state => Object.values(state.places.contacts.entities),
    state => Object.values(state.places.prices.entities),
    state => Object.values(state.places.requirements.entities),
    state => Object.values(state.places.additional_services.entities),

    (
      places,
      entertainments,
      photos,
      contacts,
      prices,
      requirements,
      additional_services
    ) => {
      const place = places[place_id]

      if (!place) return null

      return {
        ...place,
        photos: photos.filter(p => p.place_id === place.id),
        contacts: contacts.find(c => c.place_id === place.id),
        entertainment: entertainments[place.entertainment_id],
        prices: prices.filter(c => c.place_id === place.id),
        requirements: requirements.find(c => c.place_id === place.id),
        additional_services: additional_services.filter(c => c.place_id === place.id),
      }
    }
  )(state)

export default {
  all,
  current,
}
