import { all, takeEvery, fork } from 'redux-saga/effects'
import actions from 'src/redux/action'
import { normalize, putRelationsToStore } from 'utils'
import comments from './comments/saga'
import { LOAD_PLACE_FULFILLED } from './action'

const defineRelationsFrom = (models) => ([
  [models.place, actions.places.setMany],
  [models.comments, actions.places.comments.setMany],
  [models.photos, actions.places.photos.setMany],
  [models.user, actions.users.setMany],
  [models.contacts, actions.places.contacts.setMany],
  [models.entertainment, actions.entertainments.setMany]
])

function * setPlace({ payload }) {
  const models = normalize(payload, 'place')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

export default function * saga() {
  yield all([
    fork(comments),
    takeEvery(LOAD_PLACE_FULFILLED, setPlace),
  ])
}
