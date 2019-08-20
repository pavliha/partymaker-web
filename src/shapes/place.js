import { number, shape, string } from 'prop-types'

export default shape({
  id: number.isRequired,
  title: string.isRequired,
  picture_url: string.isRequired,
  price: string.isRequired,
  phone: string.isRequired,
  map_url: string.isRequired,
  website_url: string.isRequired,
  working_hours: string.isRequired,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})
