import { all, put, takeEvery } from 'redux-saga/effects'
import actions from 'src/redux/action'

import { LOAD_ROOMS_FULFILLED, LOAD_ROOM_FULFILLED } from './action'
import { normalize, putRelationsToStore } from 'utils'

const defineRelationsFrom = (models) => ([
  [models.room, actions.rooms.setMany],
  [models.users, actions.users.setMany],
  [models.place, actions.places.setMany],
])

function* setRooms({ payload: { data: rooms } }) {
  const models = normalize(rooms, 'room')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function* setRoom({ payload: room }) {
  const models = normalize(room, 'room')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function* removeRoom({ meta: { room_id } }) {
  yield put(actions.rooms.remove(room_id))
}

export default function* saga() {
  yield all([
    takeEvery(LOAD_ROOMS_FULFILLED, setRooms),
    takeEvery(LOAD_ROOM_FULFILLED, setRoom),
  ])
}
