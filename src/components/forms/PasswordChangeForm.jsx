import React from 'react'
import { object } from 'prop-types'
import { Field, Form } from 'formik'
import { CardContent, withStyles, TextField } from '@material-ui/core'
import { SubmitButton } from 'components'
import * as Yup from 'yup'
import to from 'util-to'
import transformValidationApi from 'utils/transformValidationApi'
import wait from 'utils/wait'

const styles = {
  root: {
    marginBottom: 60,
  },

  container: {
    paddingTop: 0,
  }
}

const PasswordForm = ({ classes }) =>
  <div className={classes.root}>
    <Form>
      <CardContent className={classes.container}>
        <Field
          name="password"
          label="Введите старый пароль"
          margin="normal"
          type="password"
          fullWidth
          placeholder="********"
          component={TextField}
        />
        <Field
          name="password_new"
          label="Придумайте новый пароль"
          margin="normal"
          type="password"
          placeholder="********"
          fullWidth
          component={TextField}
        />
        <Field
          name="password_repeat"
          label="Повторите новый пароль"
          margin="normal"
          type="password"
          fullWidth
          placeholder="********"
          component={TextField}
        />
      </CardContent>
      <SubmitButton>обновить</SubmitButton>
    </Form>
  </div>

PasswordForm.propTypes = {
  classes: object.isRequired,
}

PasswordForm.mapPropsToValues = () => ({
  password: '',
  password_new: '',
  password_repeat: '',
})

PasswordForm.validationSchema = Yup.object()
  .shape({
    password: Yup.lazy(
      value =>
        !value
          ? Yup.string()
          : Yup.string()
            .min(6, 'Пароль должен быть больше чем 6 символов')
            .required('Это поле является обязательным'),
    ),
    password_new: Yup.string()
      .min(6, 'Пароль должен быть больше чем 6 символов')
      .required('Это поле является обязательным'),
    password_repeat: Yup.string().oneOf(
      [Yup.ref('password_new')],
      'Пароли не совпадают',
    ),
  })

PasswordForm.handleSubmit = async (form, { props, setErrors, setStatus, resetForm, setSubmitting }) => {
  setSubmitting(true)
  const [err] = await to(props.onSubmit(form))
  if (err) setErrors(transformValidationApi(err))
  if (!err) {
    setStatus({ message: 'Пароль обновлен!' })
    resetForm(this.mapPropsToValues())
  }
  await wait(3000)
  setSubmitting(false)
  setStatus({})
}

export default withStyles(styles)(PasswordForm)
