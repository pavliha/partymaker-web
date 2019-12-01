import { number, oneOfType, shape, string } from 'prop-types'

const priceShape = shape({
  id: oneOfType([string, number]).isRequired,
  title: string.isRequired,
  cost: number,
  place_id: oneOfType([string, number]),
  created_at: string,
  updated_at: string,
})

export default priceShape
