import JWT from 'jwt-decode'

const fromJWT = (token) => JWT(token).data

export default fromJWT
