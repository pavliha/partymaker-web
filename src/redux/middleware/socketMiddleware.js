import Ws from 'services/Ws'
import { WEBSOCKET_URL } from 'config/app'

let ws

const socketMiddleware = (listeners) => ({ dispatch, getState }) => next => async action => {

  const { token } = getState().auth

  if (action.disconnect_socket) {
    if (ws?.ws) ws.close()
    next(action)
    return action
  }

  if (!action.connect_socket) {
    next(action)
    return action
  }

  if (ws?.ws) ws.close()

  const options = action.connect_socket

  ws = new Ws(WEBSOCKET_URL)

  ws.withJwtToken(token).connect()

  ws.on('open', () => {
    console.log(`connected to ${WEBSOCKET_URL}`,)
  })

  ws.on('close', () => {
    console.log(`disconnected from ${WEBSOCKET_URL}`,)
  })

  const topic = ws.subscribe(`room:${options.room_id}`)

  Object.entries(listeners).forEach(([eventName, action]) => {
    topic.on(eventName, (data) => {
      console.log(`ON:${eventName}`, data)
      dispatch(action(data))
    })
  })

  return topic
}

export default socketMiddleware
