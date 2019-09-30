import { all, takeEvery } from 'redux-saga/effects'
import { CREATE_PLACE_COMMENT_FULFILLED } from './action'
import actions from 'src/redux/action'

import { normalize, putRelationsToStore } from 'utils'

const defineRelationsFrom = (models) => ([
  [models.comment, actions.places.comments.setMany],
])

function * setComment({ payload }) {
  const models = normalize(payload, 'comment')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

export default function * saga() {
  yield all([
    takeEvery(CREATE_PLACE_COMMENT_FULFILLED, setComment),
  ])
}
