import React, { Component } from 'react'
import { shape, string, func } from 'prop-types'
import { AuthCard, PasswordResetForm } from 'components'
import { actions, connect } from 'src/redux'

class ResetScene extends Component {

  resetPassword = async ({ password }) => {
    const { match: { params: { hash } }, redux, history } = this.props
    const action = await redux.resetPassword({ hash, password })
    history.push('/profile')
    return action
  }

  render() {
    return (
      <AuthCard
        images="forgot.jpg"
        title="Восстановление пароля"
        documentTitle="Восстановление пароля - Partymaker"
      >
        <PasswordResetForm onSubmit={this.resetPassword} />
      </AuthCard>
    )
  }
}

ResetScene.propTypes = {
  history: shape({ push: func.isRequired, }),
  match: shape({ params: shape({ hash: string.isRequired }) }).isRequired,
  redux: shape({
    resetPassword: func.isRequired,
  })
}

const redux = () => ({
  resetPassword: actions.auth.password.reset
})

export default connect(redux)(ResetScene)
