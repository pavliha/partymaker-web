import disassembleModel from './disassembleModel'

const mergeFn = (accumulator, model) => {
  const models = { ...accumulator }
  Object.entries(model).forEach(([key, value]) => {
    models[key] = [...(models[key] || []), value]
  })

  return models
}

const toArrayFn = (accumulator, [key, model]) => {
  const models = { ...accumulator }
  if (!model.id) {
    models[key] = [...(models[key] || []), ...Object.values(model)]
  } else {
    models[key] = [...(models[key] || []), model]
  }

  return models
}

const normalize = (result, name = 'model') => {

  if (!result) throw new Error('entity not found!')

  if (!Array.isArray(result)) {
    const disassembledModels = disassembleModel({ ...result }, name)

    return Object.entries(disassembledModels).reduce(toArrayFn, {})
  }

  return result
    .map((model) => disassembleModel(model, name))
    .reduce(mergeFn, {})

}

export default normalize
