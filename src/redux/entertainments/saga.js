import { all, takeEvery, put } from 'redux-saga/effects'
import {
  CREATE_ENTERTAINMENT_FULFILLED,
  LOAD_ENTERTAINMENT_FULFILLED,
  UPDATE_ENTERTAINMENT_FULFILLED,
  LOAD_ENTERTAINMENTS_FULFILLED
} from './action'
import actions from 'src/redux/action'

function* setEntertainments({ payload: entertainments }) {
  yield put(actions.entertainments.setMany(entertainments))
}

function* setEntertainment({ payload: entertainment }) {
  yield put(actions.entertainments.set(entertainment))
}

export default function* saga() {
  yield all([
    takeEvery(LOAD_ENTERTAINMENTS_FULFILLED, setEntertainments),
    takeEvery(LOAD_ENTERTAINMENT_FULFILLED, setEntertainment),
    takeEvery(CREATE_ENTERTAINMENT_FULFILLED, setEntertainment),
    takeEvery(UPDATE_ENTERTAINMENT_FULFILLED, setEntertainment)
  ])
}
