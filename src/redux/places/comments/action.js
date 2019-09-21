export const SET_COMMENTS = 'SET_COMMENTS'

/**
 * Sync actions. Updating store
 */

const setMany = comments => ({
  type: SET_COMMENTS,
  payload: comments,
})

export default {
  setMany,
}
