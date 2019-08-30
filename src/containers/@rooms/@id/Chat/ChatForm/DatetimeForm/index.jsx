/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import { object, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { Field } from 'formik'
import { TextField } from 'components/formik'
import { CloseButton } from 'components'
import CalendarClockIcon from 'mdi-react/CalendarClockIcon'
import CheckIcon from 'mdi-react/CheckIcon'
import formik from './formik'

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  field: {
    maxWidth: 170,
    marginRight: 20,
  },
  input: {

    marginBottom: 3,
    height: 72,
    overflow: 'auto',
    boxSizing: 'content-box',
    padding: '0px',
  },
  icon: {
    marginRight: 10,
    marginLeft: 3,
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  checkButton: {
    marginLeft: 20,
    marginRight: 5,
  }
}

const DatetimeForm = ({ classes, handleSubmit, onClose }) =>
  <div className={classes.root}>
    <div className={classes.container}>
      <IconButton disabled className={classes.icon}>
        <CalendarClockIcon />
      </IconButton>
      <Field
        name="date"
        type="date"
        component={TextField}
        className={classes.field}
        inputProps={{ className: classes.input, }}
      />
      <Field
        name="time"
        type="time"
        component={TextField}
        className={classes.field}
        inputProps={{ className: classes.input, }}
      />
    </div>
    <CloseButton
      color="default"
      onClick={onClose}
    />
    <IconButton
      className={classes.checkButton}
      color="primary"
      onClick={handleSubmit}
    >
      <CheckIcon />
    </IconButton>
  </div>

DatetimeForm.propTypes = {
  classes: object.isRequired,
  onClose: func.isRequired,
  handleSubmit: func,
  handleReset: func,
  onSubmit: func,
}

export default withStyles(styles)(formik(DatetimeForm))
