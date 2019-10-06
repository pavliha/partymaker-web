import { bool, number, oneOfType, shape, string } from 'prop-types'

const userShape = shape({
  id: number.isRequired,
  name: string.isRequired,
  email: string.isRequired,
  phone: string,
  is_online: oneOfType([bool, number]),
  last_seen: string,
})

export default userShape
