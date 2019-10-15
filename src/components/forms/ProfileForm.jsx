import React from 'react'
import { object } from 'prop-types'
import { Form } from 'formik'
import { CardContent, withStyles, TextField } from '@material-ui/core'
import { Field, SubmitButton } from 'components'
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

const ProfileForm = ({ classes }) =>
  <div className={classes.root}>
    <Form>
      <CardContent className={classes.container}>
        <Field
          name="name"
          label="Имя и фамилия"
          margin="normal"
          placeholder="Вася Пупкин"
          component={TextField}
        />
        <Field
          type="text"
          name="phone"
          label="Номер телефона"
          margin="normal"
          placeholder="+380683188524"
          component={TextField}
        />
      </CardContent>
      <SubmitButton>сохранить</SubmitButton>
    </Form>
  </div>

ProfileForm.propTypes = {
  classes: object.isRequired,
}

ProfileForm.validationSchema = Yup.object()
  .shape({
    name: Yup.string().required('Это поле является обязательным'),
    phone: Yup.string()
      .min(6, 'Номер должен быть больше чем 6 символов')
      .required('Это поле является обязательным'),
  })

ProfileForm.mapPropsToValues = ({ user }) => ({
  name: user.name || '',
  phone: user.phone || '',
})

ProfileForm.handleSubmit = async (form, { props, setErrors, setStatus, setSubmitting }) => {
  setSubmitting(true)
  const [err] = await to(props.onSubmit(form))
  if (err) setErrors(transformValidationApi(err))
  if (!err) setStatus({ message: 'Изменения сохранены!' })
  await wait(3000)
  setSubmitting(false)
  setStatus({})
}

export default withStyles(styles)(ProfileForm)
