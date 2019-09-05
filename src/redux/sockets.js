import actions from './action'

export default {
  'online': actions.users.online,
  'message': actions.rooms.messages.receive,
  'guest:removed': actions.users.detach,
  'guest:joined': actions.users.set,
  'room:updated': actions.rooms.receive,
}
