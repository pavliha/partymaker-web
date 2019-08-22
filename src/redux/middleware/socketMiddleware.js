import Socket from 'services/Socket'

const socketMiddleware = (listeners) => ({ dispatch, getState }) => next => async action => {

  if (action.disconnect_socket) {
    if (Socket.socket) Socket.close()
    next(action)
    return action
  }

  if (!action.connect_socket) {
    next(action)
    return action
  }

  const socket = Socket.connect(action.connect_socket)

  Object.entries(listeners).forEach(([eventName, action]) => {
    socket.on(eventName, (data) => dispatch(action(data)))
  })

  return socket
}

export default socketMiddleware
