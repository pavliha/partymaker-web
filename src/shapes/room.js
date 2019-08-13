import { number, shape, string } from 'prop-types'
import placeShape from './place'

export default shape({
  id: number.isRequired,
  title: string,
  place: placeShape,
  place_id: number,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})
