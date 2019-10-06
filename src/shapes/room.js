import { number, shape, string } from 'prop-types'

const rooShape = shape({
  id: number.isRequired,
  title: string,
  place_id: number,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})

export default rooShape
