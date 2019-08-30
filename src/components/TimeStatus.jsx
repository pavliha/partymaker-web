import React from 'react'
import { object, node } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

const styles = {
  root: {
    paddingRight: 20,

  },
}

const TimeStatus = ({ classes, children }) =>
  <Typography
    color="textSecondary"
    variant="body2"
    className={classes.root}
  >
    {children || 'время еще не выбрано'}
  </Typography>

TimeStatus.propTypes = {
  classes: object.isRequired,
  children: node,
}

export default withStyles(styles)(TimeStatus)
