import { combineReducers } from 'redux'
import entities from './entities'
import comments from '../comments/reducer'
import photos from '../photos/reducer'

export default combineReducers({
  photos,
  comments,
  entities,
})
