import React, { Component } from 'react'
import { func, shape } from 'prop-types'
import { Redirect } from 'react-router-dom'
import { actions, connect } from 'src/redux'
import Storage from 'services/Storage'

class Logout extends Component {
  componentDidMount() {
    const { redux: { handleLogout } } = this.props

    Storage.clear()

    handleLogout()
  }

  render() {
    return <Redirect to="/auth/login" />
  }
}

Logout.propTypes = {
  redux: shape({
    handleLogout: func.isRequired,
  })
}

const redux = () => ({
  handleLogout: actions.auth.logout
})
export default connect(redux)(Logout)
