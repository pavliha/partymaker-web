import Http from 'services/Http'
import messages from './messages'

const room = {

  messages,

  loadMany() {
    return Http.get('/rooms')
  },

  load(id) {
    return Http.get(`/rooms/${id}`)
  },

  create(form) {
    return Http.post('/rooms', form)
  },

  update(id, form) {
    return Http.put(`/rooms/${id}`, form)
  },

  leave(id) {
    return Http.delete(`/rooms/${id}`)
  },
}

export default room
