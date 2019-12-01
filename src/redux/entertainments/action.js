import entertainment from 'api/entertainment'
import c from 'src/redux/constants'

/**
 * Async actions. Making API requests
 */

const loadMany = () => ({
  type: c.LOAD_ENTERTAINMENTS,
  payload: entertainment.loadMany()
})

const load = (entertainment_id) => ({
  type: c.LOAD_ENTERTAINMENT,
  payload: entertainment.load(entertainment_id)
})

const create = form => ({
  type: c.CREATE_ENTERTAINMENT,
  payload: entertainment.create(form)
})

const update = (entertainment_id, form) => ({
  type: c.UPDATE_ENTERTAINMENT,
  payload: entertainment.update(entertainment_id, form)
})

export default {
  loadMany,
  load,
  create,
  update,
}
