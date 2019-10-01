import React from 'react'
import { object } from 'prop-types'
import { CardContent, withStyles, TextField } from '@material-ui/core'
import { AuthCardActions, ServerMessage } from 'components'
import { Field, Form } from 'formik'
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

const PasswordForgotForm = ({ classes }) =>
  <div className={classes.root}>
    <Form>
      <CardContent>
        <Field
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          placeholder="email@example.com"
          component={TextField}
        />
        <ServerMessage variant="caption" color="primary" name="message" />
      </CardContent>
      <AuthCardActions
        textButton="Дальше"
        linkTo="/auth/register"
        textLink="Создать аккаунт"
      />
    </Form>
  </div>

PasswordForgotForm.propTypes = {
  classes: object.isRequired,
}

PasswordForgotForm.validationSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email('Неправильный email адрес!')
      .required('Это поле является обязательным'),
  })

PasswordForgotForm.mapPropsToValues = () => ({
  email: '',
})

export default withStyles(styles)(PasswordForgotForm)
