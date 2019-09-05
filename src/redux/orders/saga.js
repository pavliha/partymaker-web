import { all, takeEvery } from 'redux-saga/effects'
import { CREATE_ORDER_FULFILLED, LOAD_ORDER_FULFILLED } from './action'
import { actions } from 'src/redux'
import { normalize, putRelationsToStore } from 'utils'

const defineRelationsFrom = (models) => ([
  [models.order, actions.orders.setMany],
  [models.room, actions.rooms.setMany],
  [models.users, actions.users.setMany],
  [models.place, actions.places.setMany],
  [models.entertainment, actions.entertainments.setMany]
])

function* setOrder({ payload: order }) {
  const models = normalize(order, 'order')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

export default function* saga() {
  yield all([
    takeEvery(LOAD_ORDER_FULFILLED, setOrder),
    takeEvery(CREATE_ORDER_FULFILLED, setOrder),
  ])
}
