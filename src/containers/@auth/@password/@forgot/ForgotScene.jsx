import React, { Component } from 'react'
import { shape, func } from 'prop-types'
import { AuthCard, PasswordForgotForm } from 'components'
import { actions, connect } from 'src/redux'

class ForgotScene extends Component {

  forgotPassword = async (form) => {
    const { redux } = this.props

    const { action } = await redux.forgotPassword(form)

    return action.payload
  }

  render() {
    return (
      <AuthCard
        images="forgot.jpg"
        title="Восстановление пароля"
        documentTitle="Восстановление пароля - Partymaker"
      >
        <PasswordForgotForm onSubmit={this.forgotPassword} />
      </AuthCard>
    )
  }
}

ForgotScene.propTypes = {
  redux: shape({
    forgotPassword: func.isRequired,
  })
}

const redux = () => ({
  forgotPassword: actions.auth.password.forgot
})

export default connect(redux)(ForgotScene)
