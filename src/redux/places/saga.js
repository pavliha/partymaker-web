import { all, takeEvery } from 'redux-saga/effects'
import { LOAD_PLACE_FULFILLED } from './action'
import actions from 'src/redux/action'

import { normalize, putRelationsToStore } from 'utils'

const defineRelationsFrom = (models) => ([
  [models.place, actions.places.setMany],
  [models.comments, actions.places.comments.setMany],
  [models.photos, actions.places.photos.setMany],
  [models.user, actions.users.setMany]
])

function * setPlace({ payload }) {
  const models = normalize(payload, 'place')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

export default function * saga() {
  yield all([
    takeEvery(LOAD_PLACE_FULFILLED, setPlace),
  ])
}
