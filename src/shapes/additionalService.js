import { number, oneOfType, shape, string } from 'prop-types'

const additionalServiceShape = shape({
  id: oneOfType([number, string]).isRequired,
  title: string.isRequired,
  description: string,
  price: number,
  created_at: string,
  updated_at: string,
})

export default additionalServiceShape
