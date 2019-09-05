import api from 'api'

export const LOAD_ORDER = 'LOAD_ORDER'
export const LOAD_ORDER_FULFILLED = 'LOAD_ORDER_FULFILLED'

export const CREATE_ORDER = 'CREATE_ORDER'
export const CREATE_ORDER_FULFILLED = 'CREATE_ORDER_FULFILLED'

export const SET_ORDER = 'SET_ORDER'
export const SET_ORDERS = 'SET_ORDERS'
export const REMOVE_ORDER = 'REMOVE_ORDER'

/**
 * Async actions. Making API requests
 */

const load = order_id => ({
  type: LOAD_ORDER,
  payload: api.orders.load(order_id)
})

const create = form => ({
  type: CREATE_ORDER,
  payload: api.orders.create(form)
})

/**
 * Sync actions. Updating store
 */

const setMany = orders => ({
  type: SET_ORDERS,
  payload: orders,
})

const set = order => ({
  type: SET_ORDER,
  payload: order,
})

const remove = order_id => ({
  type: REMOVE_ORDER,
  payload: order_id,
})

export default {
  load,
  create,
  set,
  setMany,
  remove,
}
