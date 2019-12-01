import { all, takeEvery, put } from 'redux-saga/effects'
import actions from 'src/redux/action'
import c from './constants'

function * setEntities({ payload }) {
  yield put(actions.setEntities(payload))
}

export default function * rootSaga() {
  yield all([
    takeEvery(c.LOAD_PLACE_FULFILLED, setEntities),
    takeEvery(c.LOAD_ENTERTAINMENT_FULFILLED, setEntities),
    takeEvery(c.LOAD_ENTERTAINMENTS_FULFILLED, setEntities),
  ])
}
