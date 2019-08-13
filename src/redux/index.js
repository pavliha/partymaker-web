import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'
import actions from './action'
import select from './select'
import { intercept, promise } from './middleware'
import connect from 'utils/connect'

const initialState = {}

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(intercept, promise),
  ),
)

if (module.hot) {
  module.hot.accept('./reducer', () => {
    const nextRootReducer = reducers
    store.replaceReducer(nextRootReducer)
  })
}

export { store, reducers, actions, select, connect }
