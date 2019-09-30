import api from 'api'

export const SET_COMMENTS = 'SET_COMMENTS'
export const CREATE_PLACE_COMMENT = 'CREATE_PLACE_COMMENT'
export const CREATE_PLACE_COMMENT_FULFILLED = 'CREATE_PLACE_COMMENT_FULFILLED'

const create = (place_id, form) => ({
  type: CREATE_PLACE_COMMENT,
  payload: api.place.comments.create(place_id, form)
})

/**
 * Sync actions. Updating store
 */

const setMany = comments => ({
  type: SET_COMMENTS,
  payload: comments,
})

export default {
  setMany,
  create
}
