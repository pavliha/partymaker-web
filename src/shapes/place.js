import { number, shape, string } from 'prop-types'

const placeShape = shape({
  id: number.isRequired,
  title: string.isRequired,
  picture_url: string.isRequired,
  price: string,
  entertainment_id: number,
  about_prices: string,
  created_at: string,
  updated_at: string,
})

export default placeShape
