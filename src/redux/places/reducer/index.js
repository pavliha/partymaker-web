import { combineReducers } from 'redux'
import entities from './entities'
import comments from '../comments/reducer'
import photos from '../photos/reducer'
import contacts from '../contacts/reducer'

export default combineReducers({
  photos,
  comments,
  contacts,
  entities,
})
