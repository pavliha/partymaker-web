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
  link: {
    marginTop: 10,
    marginLeft: 20,
  },
}

const PasswordResetForm = ({ classes }) =>
  <div className={classes.root}>
    <Form>
      <CardContent>
        <Field
          type="password"
          name="password"
          margin="normal"
          variant="outlined"
          placeholder="*******"
          label="Введите новый пароль"
          component={TextField}
        />
        <Field
          type="password"
          name="password_repeat"
          margin="normal"
          variant="outlined"
          placeholder="*******"
          label="Повторите новый пароль"
          component={TextField}
        />
      </CardContent>
      <AuthCardActions
        textButton="Готово"
        linkTo="/auth/login"
        textLink="Войти"
      />
    </Form>
  </div>

PasswordResetForm.propTypes = {
  classes: object.isRequired,
}

PasswordResetForm.mapPropsToValues = () => ({
  password: '',
  password_repeat: '',
})

PasswordResetForm.validationSchema = Yup.object().shape({
  password: Yup.lazy(
    value => !value ? Yup.string() : Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  ),
  password_repeat: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords do not match',
  ),

})

export default withStyles(styles)(PasswordResetForm)
