import isPromise from 'utils/isPromise'
import clean from 'clean-object'

const promiseMiddleware = store => next => async action => {

  if (!isPromise(action.payload)) {
    next(action)
    return action
  }

  const pendingAction = clean({
    ...action,
    type: action.type + '_PENDING',
    payload: undefined,
  })

  store.dispatch(pendingAction)

  try {
    const resolvedAction = {
      ...action,
      type: action.type + '_FULFILLED',
      payload: await action.payload
    }

    store.dispatch(resolvedAction)

    return resolvedAction

  } catch (err) {

    const rejectedAction = {
      ...action,
      type: action.type + '_REJECTED',
      payload: err,
    }

    store.dispatch(rejectedAction)

    return rejectedAction
  }
}

export default promiseMiddleware
