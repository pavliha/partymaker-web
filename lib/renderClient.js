import React from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'

const renderClient = (jsx, mount) => {

  const Client = () => {

    React.useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) jssStyles.parentNode.removeChild(jssStyles)
    }, [])

    return (
      <BrowserRouter>
        {jsx}
      </BrowserRouter>
    )
  }

  if (module.hot) {
    render(<Client />, mount)
  } else {
    loadableReady(() => hydrate(<Client />, mount))
  }

  if (module.hot) module.hot.accept()
}

export default renderClient
