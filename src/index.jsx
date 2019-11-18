import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter } from 'react-router-dom'
import Layout from './containers/Layout'
import { ThemeProvider } from '@material-ui/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import theme from 'config/theme'
import { store } from 'src/redux'
import './index.css'

class App extends PureComponent {

  componentDidMount() {
    const loader = document.querySelector('.partymaker-loader')
    loader.remove()
    console.log('loaded')
  }

  render() {
    return (
      <ThemeProvider theme={createMuiTheme(theme)}>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </ReduxProvider>
      </ThemeProvider>
    )
  }
}

const HotApp = hot(App)

ReactDOM.render(<HotApp />, document.getElementById('root'))
