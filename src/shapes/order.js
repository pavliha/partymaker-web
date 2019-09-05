import { number, shape, string } from 'prop-types'

export default shape({
  id: number.isRequired,
  date: string.isRequired,
  time: string,
  phone: string.isRequired,
  guests: number.isRequired,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})
