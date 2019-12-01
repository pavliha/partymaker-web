import places from './places/action'
import entertainments from './entertainments/action'
import c from 'src/redux/constants'

const setEntities = entities => ({
  type: c.SET_ENTITIES,
  payload: entities,
})

export default {
  places,
  entertainments,
  setEntities,
}
