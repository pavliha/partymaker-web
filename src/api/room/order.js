import Http from 'services/Http'

const order = {

  load(room_id) {
    return Http.get(`rooms/${room_id}/order`)
  },

  create(room_id, form) {
    return Http.post(`rooms/${room_id}/orders`, form)
  },

}

export default order
