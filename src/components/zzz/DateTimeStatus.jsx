import React from 'react'
import { object, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import moment from 'moment'
import classNames from 'classnames'

const styles = {
  root: {
    width: 180,
    opacity: 0.7,
  },
}

const DateTimeStatus = ({ classes, className, date, time }) =>
  <Typography className={classNames([classes.root, className])}>
    {(date && moment(date).format('D MMMM, dddd')) || 'дата еще не выбрана'} {time}
  </Typography>

DateTimeStatus.propTypes = {
  classes: object.isRequired,
  className: string,
  date: string,
  time: string,
}

export default withStyles(styles)(DateTimeStatus)
