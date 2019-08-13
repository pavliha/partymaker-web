import merge from 'lodash/merge'
import arrayToObject from './arrayToObject'

const mergeModels = (oldModels, newModels) => {
  if (Array.isArray(newModels)) {
    return arrayToObject(newModels.map(model => ({
      ...oldModels[model.id],
      ...model,
    })))
  }

  return merge(oldModels, newModels)
}

export default mergeModels
