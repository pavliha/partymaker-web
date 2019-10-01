import React from 'react'
import { object, node, arrayOf, oneOfType, bool } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 5px'
  },
}

const OverlayManager = ({ classes, overlays, children }) => {

  for (const Overlay of overlays) {
    if (Overlay) return Overlay
  }

  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

OverlayManager.propTypes = {
  classes: object.isRequired,
  children: node.isRequired,
  overlays: arrayOf(oneOfType([object, bool])).isRequired,
}

export default withStyles(styles)(OverlayManager)
