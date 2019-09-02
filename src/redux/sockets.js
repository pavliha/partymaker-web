import actions from './action'

export default {
  'online': actions.users.online,
  'message': actions.rooms.messages.receive,
  'guest:removed': actions.users.detach,
  'room:updated': actions.rooms.receive,
}
