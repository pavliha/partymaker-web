import io from 'socket.io-client'
import { store } from 'src/redux'

class Socket {

  socket = null

  connect(url) {
    this.socket = io.connect(url, {
      transports: ['websocket'],
      upgrade: false,
      query: {
        token: store.getState().auth.token
      }
    })

    this.socket.on('connect', () => console.log(`connected to ${url}`))
    return this
  }

  checkConnection(){
    if (!this.socket) throw new Error('Not connected to socket!')
  }

  on(eventName, callback) {

    this.checkConnection()

    this.socket.on(eventName, (data) => {
      console.log(`ON:${eventName}`, data)
      callback(data)
    })

    return this
  }

  emit(eventName, data) {

    this.checkConnection()

    console.log(`EMIT:${eventName}`, data)

    this.socket.emit(eventName, data)

    return this
  }

  close() {

    this.checkConnection()

    this.socket.close()
  }
}

const instance = new Socket()

export default instance
