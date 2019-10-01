import React from 'react'
import { object, bool, node } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

const styles = {
  root: {
    marginBottom: -7,
    padding: '0 80px'
  },
}

const MessageUserCaption = ({ classes, isMine, children }) => {

  if (!children) return null

  if (isMine) return null

  return (
    <Typography
      component="div"
      className={classes.root}
      align={isMine ? 'right' : 'left'}
      variant="caption"
      color="textSecondary"
    >
      {children}
    </Typography>
  )
}

MessageUserCaption.propTypes = {
  classes: object.isRequired,
  isMine: bool.isRequired,
  children: node
}

export default withStyles(styles)(MessageUserCaption)