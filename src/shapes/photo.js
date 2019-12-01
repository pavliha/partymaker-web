import { number, shape, string } from 'prop-types'

const photoShape = shape({
  id: number.isRequired,
  url: string.isRequired,
  place_id: number.isRequired,
  created_at: string,
  updated_at: string,
})

export default photoShape
