import clean from 'clean-object'
import isPromise from 'src/utils/isPromise'

const interceptorMiddleware = store => next => async action => {

  if (!isPromise(action.payload) || !action.intercept) {
    next(action)
    return action
  }

  // const pendingAction = clean({
  //   ...action,
  //   type: action.type + '_PENDING',
  //   payload: undefined,
  //   intercept: undefined,
  // })
  //
  // store.dispatch(pendingAction)

  try {
    const resolvedAction = clean({
      ...action,
      type: action.type + '_FULFILLED',
      payload: await action.payload,
      intercept: undefined
    })

    const interceptedAction = await action.intercept(resolvedAction, store.dispatch)
    store.dispatch(interceptedAction || resolvedAction)
    return clean(interceptedAction || resolvedAction)

  } catch (err) {
    const rejectedAction = clean({
      ...action,
      type: action.type + '_REJECTED',
      payload: err,
      intercept: undefined
    })

    store.dispatch(rejectedAction)

    throw rejectedAction
  }
}

export default interceptorMiddleware
