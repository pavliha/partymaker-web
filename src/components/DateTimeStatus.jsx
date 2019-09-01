import React from 'react'
import { object, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import moment from 'moment'
import classNames from 'classnames'

const styles = {
  root: {
    paddingRight: 20,
    width: 170,
  },
}

const DateTimeStatus = ({ classes, className, date, time }) =>
  <Typography
    color="textSecondary"
    variant="body2"
    className={classNames([classes.root, className])}
  >
    {(date && moment(date).format('D MMMM, dddd')) || 'дата еще не выбрана'} {time}
  </Typography>

DateTimeStatus.propTypes = {
  classes: object.isRequired,
  className: string,
  date: string,
  time: string,
}

export default withStyles(styles)(DateTimeStatus)
