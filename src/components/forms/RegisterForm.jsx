import React from 'react'
import { object } from 'prop-types'
import { CardContent, withStyles, TextField } from '@material-ui/core'
import { AuthCardActions, Field } from 'components'
import { Form } from 'formik'
import * as Yup from 'yup'

const styles = {
  root: {
    color: '#0083bc'
  },
}

const RegisterForm = ({ classes }) =>
  <div className={classes.root}>
    <Form>
      <CardContent>
        <Field
          id="register-name-field"
          name="name"
          label="Имя и фамилия"
          margin="normal"
          variant="outlined"
          placeholder="Вася Пупкин"
          fullWidth
          component={TextField}
        />
        <Field
          id="register-email-field"
          name="email"
          label="Email"
          margin="normal"
          autoComplete="email"
          variant="outlined"
          fullWidth
          placeholder="email@example.com"
          component={TextField}
        />
        <Field
          id="register-password-field"
          type="password"
          name="password"
          margin="normal"
          autoComplete="current-password"
          variant="outlined"
          label="Пароль"
          fullWidth
          placeholder="*******"
          component={TextField}
        />
      </CardContent>
      <AuthCardActions
        textButton="Дальше"
        linkTo="/auth/login"
        textLink="Уже есть аккаунт?"
      />
    </Form>
  </div>

RegisterForm.propTypes = {
  classes: object.isRequired,
}

RegisterForm.validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Это поле является обязательным'),
  email: Yup.string()
    .email('Неправильный email адрес!')
    .required('Это поле является обязательным'),
  password: Yup.string()
    .min(6, 'Пароль должен быть больше чем 6 символов')
    .required('Это поле является обязательным'),
})

RegisterForm.mapPropsToValues = () => ({
  name: '',
  email: '',
  password: '',
})

export default withStyles(styles)(RegisterForm)
