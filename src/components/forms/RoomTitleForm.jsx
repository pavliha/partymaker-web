import React from 'react'
import { Form } from 'formik'
import { object, func } from 'prop-types'
import { withStyles, IconButton, TextField } from '@material-ui/core'
import { ServerMessage, CloseButton, Field } from 'components'
import * as Yup from 'yup'
import CheckIcon from 'mdi-react/CheckIcon'

const styles = {

  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  field: {
    display: 'flex'
  },

  sendField: {
    flexGrow: 1,
  },
  error: {
    marginLeft: 15,
  },
}

const RoomTitleForm = ({ classes, onCancel }) =>
  <Form className={classes.root}>
    <ServerMessage
      className={classes.error}
      variant="caption"
      color="error"
      name="non_field_error"
    />
    <Field name="title" component={TextField} />
    <CloseButton onClick={onCancel} />
    <IconButton type="submit"><CheckIcon /></IconButton>
  </Form>

RoomTitleForm.propTypes = {
  classes: object.isRequired,
  onCancel: func,
}

RoomTitleForm.validationSchema = Yup.object().shape({
  title: Yup.string().required()
})

RoomTitleForm.mapPropsToValues = ({ title }) => ({
  title: title || '',
})

export default withStyles(styles)(RoomTitleForm)
