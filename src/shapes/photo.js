import { number, shape, string } from 'prop-types'

export default shape({
  id: number.isRequired,
  url: string.isRequired,
  place_id: string.isRequired,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})
