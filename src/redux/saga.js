import { all, fork } from 'redux-saga/effects'
import auth from './auth/saga'
import rooms from './rooms/saga'
import places from './places/saga'
import assets from './assets/saga'

export default function* rootSaga() {
  yield all([
    fork(auth),
    fork(rooms),
    fork(places),
    fork(assets)
  ])
}
