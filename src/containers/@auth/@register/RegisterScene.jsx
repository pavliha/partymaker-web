import React, { Component } from 'react'
import { shape, func } from 'prop-types'
import { AuthCard, RegisterForm } from 'components'
import { Helmet } from 'react-helmet'
import Storage from 'services/Storage'
import { actions, connect } from 'src/redux'
import Form from 'components/forms/Form'

class RegisterScene extends Component {

  register = async credentials => {
    const { history, redux } = this.props
    await redux.register(credentials)
    const previous_user_location = Storage.get('previous_user_location')
    history.push(previous_user_location || '/profile')
  }

  render() {
    return (
      <AuthCard title="РЕГИСТРАЦИЯ">
        <Helmet>
          <title>Регистрация - Partymaker</title>
        </Helmet>
        <Form component={RegisterForm} onSubmit={this.register} />
      </AuthCard>
    )
  }
}

RegisterScene.propTypes = {
  redux: shape({
    register: func.isRequired,
  }),
  history: shape({
    push: func.isRequired
  })
}

const redux = () => ({
  register: actions.auth.register
})

export default connect(redux)(RegisterScene)
