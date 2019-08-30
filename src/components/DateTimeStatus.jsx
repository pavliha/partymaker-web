import React from 'react'
import { object, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import moment from 'moment'

const styles = {
  root: {
    paddingRight: 20,

  },
}

const DateTimeStatus = ({ classes, date, time }) =>
  <Typography
    color="textSecondary"
    variant="body2"
    className={classes.root}
  >
    {(date && moment(date).format('D MMMM, dddd')) || 'дата еще не выбрана'} {time}
  </Typography>

DateTimeStatus.propTypes = {
  classes: object.isRequired,
  date: string,
  time: string,
}

export default withStyles(styles)(DateTimeStatus)
