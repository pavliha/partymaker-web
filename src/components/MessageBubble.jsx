import React from 'react'
import { object, bool, node } from 'prop-types'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: 520,
  },
  isMine: {
    background: theme.palette.primary.main
  }
})

const MessageBubble = ({ classes, children, isMine }) =>
  <div className={classNames({ [classes.root]: true, isMine: isMine })}>
    {children}
  </div>

MessageBubble.propTypes = {
  classes: object.isRequired,
  children: node.isRequired,
  isMine: bool.isRequired,
}

export default withStyles(styles)(MessageBubble)
