import Http from 'services/Http'

const order = {

  load(token) {
    return Http.get(`/order/${token}`)
  },

}

export default order
