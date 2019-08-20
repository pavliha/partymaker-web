import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter } from 'react-router-dom'
import 'moment/locale/es.js'
import 'moment/locale/en-gb.js'
import Layout from './containers/Layout'
import { ThemeProvider } from '@material-ui/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import theme from 'config/theme'
import './index.css'

const App = () =>
  <ThemeProvider theme={createMuiTheme(theme)}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ThemeProvider>

const HotApp = hot(App)

ReactDOM.render(<HotApp />, document.getElementById('root'))
