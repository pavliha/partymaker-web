import React from 'react'
import { object } from 'prop-types'
import { Form } from 'formik'
import { CardContent, withStyles, TextField } from '@material-ui/core'
import { AuthCardActions, Field, ServerMessage } from 'components'
import * as Yup from 'yup'

const styles = {
  root: {
    color: '#0083bc'
  },
  link: {
    marginTop: 10,
    marginLeft: 20,
  },
}

const LoginForm = ({ classes }) =>
  <div className={classes.root} id="login-form">
    <Form>
      <CardContent>
        <Field
          id="login-email-field"
          name="email"
          label="Email"
          autoComplete="email"
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder="email@example.com"
          component={TextField}
        />
        <Field
          id="login-password-field"
          type="password"
          name="password"
          label="Пароль"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          variant="outlined"
          placeholder="*******"
          component={TextField}
        />
      </CardContent>
      <ServerMessage color="error" name="non_field_error" />
      <AuthCardActions
        textButton="Войти"
        linkTo="/auth/password/forgot"
        textLink="Забыли пароль?"
      />
    </Form>
  </div>

LoginForm.propTypes = {
  classes: object.isRequired,
}

LoginForm.mapPropsToValues = () => ({
  email: '',
  password: '',
})

LoginForm.validationSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email('Неправильный email адрес!')
      .required('Это поле является обязательным'),
    password: Yup.string()
      .min(6, 'Пароль должен быть больше чем 6 символов')
      .required('Это поле является обязательным'),
  })

export default withStyles(styles)(LoginForm)
