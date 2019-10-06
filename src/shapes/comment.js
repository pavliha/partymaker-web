import { number, shape, string } from 'prop-types'
import userShape from 'shapes/user'

const commentShape = shape({
  id: number.isRequired,
  text: string.isRequired,
  place_id: number.isRequired,
  user_id: number.isRequired,
  user: userShape,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})

export default commentShape
