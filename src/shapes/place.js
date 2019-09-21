import { number, shape, string } from 'prop-types'

export default shape({
  id: number.isRequired,
  title: string.isRequired,
  picture_url: string.isRequired,
  price: string.isRequired,
  phone: string,
  map_url: string.isRequired,
  website_url: string.isRequired,
  working_hours: string.isRequired,
  entertainment_id: number,
  instagram_url: string,
  rating: number,
  rating_count: number,
  created_at: string.isRequired,
  updated_at: string.isRequired,
})
