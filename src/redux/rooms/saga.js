import { all, put, takeEvery, fork } from 'redux-saga/effects'
import { actions } from 'src/redux'
import messages from './messages/saga'
import guests from './guests/saga'

import {
  LOAD_ROOMS_FULFILLED,
  LOAD_ROOM_FULFILLED,
  CREATE_ROOM_FULFILLED,
  UPDATE_ROOM_PENDING,
  UPDATE_ROOM_FULFILLED,
  LEAVE_ROOM_FULFILLED,
  JOIN_ROOM_FULFILLED, RECEIVE_ROOM,
} from './action'

import { normalize, putRelationsToStore } from 'utils'

const defineRelationsFrom = (models) => ([
  [models.room, actions.rooms.setMany],
  [models.users, actions.users.setMany],
  [models.place, actions.places.setMany],
  [models.entertainment, actions.entertainments.setMany],
])

function * setRooms({ payload: rooms }) {
  const models = normalize(rooms, 'room')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function * temporarySetRoomTitle({ meta: { room_id, form } }) {
  if (!form.title) return
  yield put(actions.rooms.set({ id: room_id, title: form.title }))
}

function * setRoom({ payload: room }) {
  const models = normalize(room, 'room')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function * removeRoom({ meta: { room_id } }) {
  yield put(actions.rooms.remove(room_id))
}

export default function * saga() {
  yield all([
    fork(guests),
    fork(messages),
    takeEvery(LOAD_ROOMS_FULFILLED, setRooms),
    takeEvery(LOAD_ROOM_FULFILLED, setRoom),
    takeEvery(CREATE_ROOM_FULFILLED, setRoom),
    takeEvery(UPDATE_ROOM_FULFILLED, setRoom),
    takeEvery(UPDATE_ROOM_PENDING, temporarySetRoomTitle),
    takeEvery(JOIN_ROOM_FULFILLED, setRoom),
    takeEvery(LEAVE_ROOM_FULFILLED, removeRoom),
    takeEvery(RECEIVE_ROOM, setRoom)
  ])
}
