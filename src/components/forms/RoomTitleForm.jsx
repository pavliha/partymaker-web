import React from 'react'
import { Form } from 'formik'
import { object, func } from 'prop-types'
import { withStyles, IconButton, TextField } from '@material-ui/core'
import { ServerMessage, CloseButton, Field } from 'components'
import * as Yup from 'yup'
import CheckIcon from 'mdi-react/CheckIcon'

const styles = {

  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },

  field: {
    flex: 1,
  },

  actions: {
    display: 'flex'
  }
}

const RoomTitleForm = ({ classes, onCancel }) =>
  <Form className={classes.root}>
    <div className={classes.field}>
      <Field name="title" id="RoomTitleForm-title-field" component={TextField} />
      <ServerMessage
        className={classes.error}
        variant="caption"
        color="error"
        name="non_field_error"
      />
    </div>
    <div className={classes.actions}>
      <CloseButton color="default" onClick={onCancel} />
      <div>
        <IconButton color="primary" id="RoomTitleForm-submit-icon" type="submit"><CheckIcon /></IconButton>
      </div>
    </div>
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
