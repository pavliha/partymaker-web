import actions from 'src/redux/action'
import { all, put, takeEvery } from 'redux-saga/effects'

import {
  KICK_ROOM_GUEST_FULFILLED,
  LOAD_ROOM_GUESTS_FULFILLED,
  GUEST_JOINED,
  GUEST_LEFT
} from './action'

function* addGuests({ payload: users, meta: { room_id } }) {
  yield put(actions.users.setMany(users))
  yield put(actions.rooms.guests.setMany(room_id, users.map(u => u.id)))
}

function* addGuest({ payload: user, meta: { room_id } }) {
  yield put(actions.users.set(user))
  yield put(actions.rooms.guests.set(room_id, user.id))
}

function* removeGuest({ meta: { user_id, room_id } }) {
  yield put(actions.users.detach(user_id, room_id))
}

export default function* saga() {
  yield all([
    takeEvery(LOAD_ROOM_GUESTS_FULFILLED, addGuests),
    takeEvery(KICK_ROOM_GUEST_FULFILLED, removeGuest),
    takeEvery(GUEST_JOINED, addGuest),
    takeEvery(GUEST_LEFT, removeGuest),
  ])
}
