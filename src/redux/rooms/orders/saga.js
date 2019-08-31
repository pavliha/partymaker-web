import { all, takeEvery, put } from 'redux-saga/effects'
import { CREATE_ORDER_FULFILLED, LOAD_ORDER_FULFILLED } from './action'
import actions from 'src/redux/action'

function* setOrder({ payload: order }) {
  yield put(actions.orders.set(order))
}

export default function* saga() {
  yield all([
    takeEvery(LOAD_ORDER_FULFILLED, setOrder),
    takeEvery(CREATE_ORDER_FULFILLED, setOrder),
  ])
}
