import { all, fork } from 'redux-saga/effects'
import auth from './auth/saga'
import rooms from './rooms/saga'
import places from './places/saga'
import assets from './assets/saga'
import entertainments from './entertainments/saga'
import orders from './orders/saga'

export default function* rootSaga() {
  yield all([
    fork(auth),
    fork(rooms),
    fork(places),
    fork(assets),
    fork(entertainments),
    fork(orders)
  ])
}
