import React from 'react'
import { object } from 'prop-types'
import { Form } from 'formik'
import { CardContent, withStyles, TextField } from '@material-ui/core'
import { SubmitButton, Field } from 'components'
import * as Yup from 'yup'

const styles = {
  root: {
    marginBottom: 60,
  },

  container: {
    paddingTop: 0,
  }
}

const ContactForm = ({ classes }) =>
  <Form className={classes.root}>
    <CardContent className={classes.container}>
      <Field
        type="text"
        name="facebook"
        label="facebook"
        margin="normal"
        placeholder="username"
        component={TextField}
      />
      <Field
        type="text"
        name="instagram"
        label="instagram"
        margin="normal"
        placeholder="@username"
        component={TextField}
      />
      <Field
        type="text"
        name="telegram"
        label="telegram"
        margin="normal"
        placeholder="@username"
        component={TextField}
      />
      <Field
        type="text"
        name="skype"
        label="skype"
        margin="normal"
        placeholder="username"
        component={TextField}
      />
    </CardContent>
    <SubmitButton>сохранить</SubmitButton>
  </Form>

ContactForm.propTypes = {
  classes: object.isRequired,
}

ContactForm.mapPropsToValues = ({ account }) => ({
  facebook: account?.facebook || '',
  telegram: account?.telegram || '',
  skype: account?.skype || '',
  instagram: account?.instagram || '',
})

ContactForm.validationSchema = Yup.object().shape({
  instagram: Yup.string(),
  facebook: Yup.string(),
  skype: Yup.string(),
  telegram: Yup.string(),
})

export default withStyles(styles)(ContactForm)
