import { number, oneOfType, shape, string } from 'prop-types'

const requirementsShape = shape({
  id: oneOfType([number, string]).isRequired,
  players_max: number,
  players_min: number,
  age_max: number,
  age_min: number,
  min_order_amount: number,
  created_at: string,
  updated_at: string,
})

export default requirementsShape
