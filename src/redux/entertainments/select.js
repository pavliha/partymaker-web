import { createSelector } from 'reselect'

const all = createSelector(
  state => Object.values(state.entertainments.entities),
  state => Object.values(state.places.entities),

  (entertainments, places) => entertainments
    .map(e => ({ ...e, places: places.filter(p => p.entertainment_id === e.id).slice(0, 6) }))
    .sort((prev, next) => prev.order - next.order)
)

const current = (state, entertainment_id) =>
  createSelector(
    state => state.entertainments.entities,
    state => Object.values(state.places.entities),

    (entertainments, places) => {
      const entertainment = entertainments[entertainment_id]
      if (!entertainment) return null

      return {
        ...entertainment,
        places: places.filter(p => p.entertainment_id === Number(entertainment_id)),
      }
    }
  )(state)

export default {
  all,
  current,
}
