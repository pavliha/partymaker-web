import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'
import actions from './action'
import selectors from './selector'
import intercept from 'src/redux/middleware/intercept'
import promise from 'redux-promise-middleware'
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
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextRootReducer = reducers
    store.replaceReducer(nextRootReducer)
  })
}

export { store, reducers, actions, selectors, connect }
