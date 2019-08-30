import { arrayOf, number, shape, string } from 'prop-types'
import place from './place'

export default shape({
  id: number.isRequired,
  title: string.isRequired,
  places: arrayOf(place),
})
