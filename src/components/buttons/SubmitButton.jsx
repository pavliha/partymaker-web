import React from 'react'
import { connect } from 'formik'
import { object, bool, shape, node } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import { ServerMessage } from 'components'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    minWidth: 130,
    marginRight: 15,
  }
}

const SubmitButton = ({ formik, classes, children }) =>
  <div className={classes.root}>
    <Button
      disabled={formik.isSubmitting}
      className={classes.button}
      type="submit"
      size="large"
      color="primary"
    >
      {children}
    </Button>
    <ServerMessage color="primary" name="message" />
    <ServerMessage color="error" name="non_field_error" />
  </div>

SubmitButton.propTypes = {
  classes: object.isRequired,
  children: node.isRequired,
  formik: shape({
    isSubmitting: bool.isRequired
  }),
}

export default withStyles(styles)(connect(SubmitButton))
