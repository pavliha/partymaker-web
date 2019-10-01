import React from 'react'
import { object, bool, oneOfType, number } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = () => ({
  root: {
    position: 'absolute',
    borderRadius: '100%',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    background: '#2dc24a',
    border: '2px solid white',
    // boxShadow: '2px 2px 3px -1px rgba(156, 169, 189, 0.3)',
  },
})

const OnlineIndicator = ({ classes, isVisible }) => {

  if (!isVisible) return null

  return <div className={classes.root} />
}

OnlineIndicator.propTypes = {
  classes: object.isRequired,
  isVisible: oneOfType([bool, number]),
}

export default withStyles(styles)(OnlineIndicator)
