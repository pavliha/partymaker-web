import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'src/redux'
import 'moment/locale/es.js'
import 'moment/locale/en-gb.js'
import Layout from './containers/Layout'
import { ThemeProvider } from '@material-ui/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import theme from 'config/theme'
import './index.css'

const App = () =>
  <ThemeProvider theme={createMuiTheme(theme)}>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>

const HotApp = hot(App)

ReactDOM.render(<HotApp />, document.getElementById('root'))
