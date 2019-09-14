import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import omit from 'lodash/omit'
import merge from 'lodash/merge'

/**
 *
 * @param entries
 * @param accumulator
 *
 * @example [
 { lesson: [{ id: 1, title: 'lesson 1' }] },
 { lesson: [{ id: 2, title: 'lesson 2' }] },
 { location: [{ id: 1, title: 'location 1' }], }
 ]
 *
 * @returns {*}
 *
 * @example {
    lesson: [
      { id: 1, title: 'lesson 1' },
      { id: 2, title: 'lesson 2' }
    ],
    location: [{ id: 1, title: 'location 1' }]
  }
 */

const mergeEntries = (entries, accumulator) =>
  entries.reduce((accumulator, value) => {
    return Object.entries(accumulator).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: [...(acc[key] || []), ...value]
    }), value)
  }, accumulator)

const mapEntries = (model) =>
  Object.entries(model)
    .map(([key, value]) => ({ [key]: [value] }))

const mapEntriesArray = (model) =>
  Object.entries(model)
    .map(([key, value]) => ({ [key]: Object.values(value) }))

const removeArrayLikeFromModel = (model, arrayLike) => {
  const keys = Object.keys(arrayLike)
  return omit(model, keys)
}

const mergeFn = (models, model) => {
  const entries = Object.entries(model)
    .map(([key, model]) => {
      return [key, { [model.id || model._id]: model }]
    }).reduce((models, [key, model]) => {

      return { ...models, [key]: model }
    }, {})

  return merge(models, entries)
}

const extractArrayLike = (model) => {
  return Object.entries(model).reduce((acc, [key, value]) => {
    const isArrayLike = !(value.id || value._id)
    return isArrayLike ? { ...acc, [key]: value } : acc
  }, {})
}

const addIdsFromNestedModelsFn = (models, [key, value]) => {
  const id = value?.id || value?._id
  if (id) return ({ ...omit(models, key), [key + '_id']: id })
  if (isArray(value)) return omit(models, key)
  return { ...models, [key]: value }
}

const extractNestedModelsFn = (models, [key, value]) => {
  if (isArray(value)) {
    const extracted = value
      .map(v => disassembleModel(v, key))
      .reduce(mergeFn, {})

    return { ...models, ...extracted }
  }

  if (isObject(value) && (value.id || value._id)) {
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

const mergeAllFn = (accumulator, model) => {
  const arrayLike = extractArrayLike(model)
  const arrayOfEntries = mapEntriesArray(arrayLike)
  const modelWithoutArrayLike = removeArrayLikeFromModel(model, arrayLike)
  const entriesMap = [...mapEntries(modelWithoutArrayLike), ...arrayOfEntries]
  return mergeEntries(entriesMap, accumulator)
}

const toArrayFn = (accumulator, [key, model]) => {
  const models = { ...accumulator }
  if (!(model.id || model._id)) {
    models[key] = [...(models[key] || []), ...Object.values(model)]
  } else {
    models[key] = [...(models[key] || []), model]
  }

  return models
}

const normalize = (data, name = 'model') => {

  if (!data) throw new Error('entity not found! Check normalize-api input')

  if (!Array.isArray(data)) {
    const disassembledModels = disassembleModel({ ...data }, name)
    return Object.entries(disassembledModels).reduce(toArrayFn, {})
  }

  return data
    .map((model) => disassembleModel(model, name))
    .reduce(mergeAllFn, {})

}

export default normalize
