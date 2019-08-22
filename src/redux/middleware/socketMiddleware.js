import io from 'socket.io-client'

let socket

const socketMiddleware = (listeners) => ({ dispatch, getState }) => next => async action => {

  if (action.disconnect_socket) {
    if (socket) socket.close()
    next(action)
    return action
  }

  if (!action.connect_socket) {
    next(action)
    return action
  }

  const createSocketConnection = (url) => {
    const socket = io.connect(url, {
      transports: ['websocket'],
      upgrade: false,
      query: {
        token: getState().auth.token
      }
    })

    socket.on('connect', () => console.log(`connected to ${url}`))

    Object.entries(listeners).forEach(([eventName, action]) => {
      socket.on(eventName, (data) => {
        console.log(`ON:${eventName}`, data)
        dispatch(action(data))
      })
    })

    return socket
  }

  const url = action.connect_socket

  socket = createSocketConnection(url)
}

export default socketMiddleware
