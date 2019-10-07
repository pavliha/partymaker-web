import React from 'react'
import { func, shape } from 'prop-types'
import { AuthCard, PasswordForgotForm, Form } from 'components'
import { actions, connect } from 'src/redux'

const ForgotScene = ({ redux: { forgotPassword } }) =>
  <AuthCard
    images="forgot.jpg"
    title="Восстановление пароля"
    documentTitle="Восстановление пароля - Partymaker"
  >
    <Form component={PasswordForgotForm} onSubmit={forgotPassword} />
  </AuthCard>

ForgotScene.propTypes = {
  redux: shape({
    forgotPassword: func.isRequired,
  })
}

const redux = () => ({
  forgotPassword: actions.auth.password.forgot
})

export default connect(redux)(ForgotScene)
