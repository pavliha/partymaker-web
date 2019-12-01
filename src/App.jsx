import init from 'lib/init'
import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from './config/theme'
import Layout from 'containers/Layout'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { Provider } from 'react-redux'
import { store } from 'src/redux'
import 'src/styles.css'

const App = () => {
  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ThemeProvider>
  )
}

export default init(App)
