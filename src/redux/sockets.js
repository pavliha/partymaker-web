import actions from './action'

export default {
  online: actions.users.online,
  offline: actions.users.offline,
  message: actions.rooms.messages.receive,
}
