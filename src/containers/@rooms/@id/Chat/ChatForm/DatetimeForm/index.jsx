/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import { object, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { Form, Field } from 'formik'
import { TextField } from 'components/formik'
import formik from './formik'
import { CloseButton } from 'components'
import CalendarClockIcon from 'mdi-react/CalendarClockIcon'
import CheckIcon from 'mdi-react/CheckIcon'

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
}

const DatetimeForm = ({ classes, handleSubmit, handleReset }) =>
  <Form className={classes.root}>
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
      type="reset"
      color="textSecondary"
      onClick={handleReset}
    />
    <IconButton
      className={classes.checkButton}
      color="primary"
      type="submit"
      onClick={handleSubmit}
    >
      <CheckIcon />
    </IconButton>

  </Form>

DatetimeForm.propTypes = {
  classes: object.isRequired,
  handleSubmit: func,
  handleReset: func,
  onSubmit: func,
}

export default withStyles(styles)(formik(DatetimeForm))
