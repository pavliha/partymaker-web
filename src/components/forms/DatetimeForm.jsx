/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import { object, func } from 'prop-types'
import { IconButton, withStyles, TextField } from '@material-ui/core'
import { CloseButton, Field } from 'components'
import CalendarClockIcon from 'mdi-react/CalendarClockIcon'
import CheckIcon from 'mdi-react/CheckIcon'
import classNames from 'classnames'
import transformValidationApi from 'utils/transformValidationApi'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  field: {
    marginRight: 0,
    minWidth: 125,
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
    marginLeft: 10,
    marginRight: 5,
  },
  fields: {
    display: 'flex',
  },
  timeField: {
    minWidth: 'auto',
  },
  closeIcon: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inherit'
    },
  }
})

const DatetimeForm = ({ classes, handleSubmit, onClose }) =>
  <div className={classes.root}>
    <div className={classes.container}>
      <IconButton disabled className={classes.icon}>
        <CalendarClockIcon />
      </IconButton>
      <div className={classes.fields}>
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
          className={classNames([classes.field, classes.timeField])}
          inputProps={{ className: classes.input, }}
        />
      </div>
    </div>
    <CloseButton
      className={classes.closeIcon}
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

DatetimeForm.mapPropsToValues = () => ({
  date: '2019-08-29',
  time: '18:00'
})

DatetimeForm.handleSubmit = ({ date, time }, { props: { onSubmit }, setErrors, setSubmitting }) => {
  try {
    setSubmitting(true)
    onSubmit({ date, time: time.substring(0, 5) })
  } catch (error) {
    setErrors(transformValidationApi(error))
  } finally {
    setSubmitting(false)
  }
}

export default withStyles(styles)(DatetimeForm)
