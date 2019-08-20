import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import omit from 'lodash/omit'
import merge from 'lodash/merge'

const mergeFn = (models, model) => {

  const entries = Object.entries(model)
    .map(([key, model]) => {
      return [key, { [model.id]: model }]
    }).reduce((models, [key, model]) => {

      return { ...models, [key]: model }
    }, {})

  return merge(models, entries)
}

const addIdsFromNestedModelsFn = (models, [key, value]) => {
  if (isObject(value) && value.id) {
    return ({ ...omit(models, key), [key + '_id']: value.id })
  }
  if (isArray(value)) {
    return omit(models, key)
  }

  return { ...models, [key]: value }
}

const extractNestedModelsFn = (models, [key, value]) => {
  if (isArray(value)) {
    const extracted = value
      .map(v => disassembleModel(v, key))
      .reduce(mergeFn, {})

    return { ...models, ...extracted }
  }

  if (isObject(value) && value.id) {
    const disassembled = disassembleModel(value, key)
    models = omit(models, key)
    return { ...models, ...disassembled }
  }

  return models
}

const disassembleModel = (model, name = 'model') => {
  const entries = Object.entries(model)
  const extractedModels = entries.reduce(extractNestedModelsFn, {})
  const modelWithIds = entries.reduce(addIdsFromNestedModelsFn, {})
  return { [name]: modelWithIds, ...extractedModels }
}

export default disassembleModel
