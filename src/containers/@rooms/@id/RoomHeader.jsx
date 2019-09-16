import React from 'react'
import { node } from 'prop-types'
import { Toolbar, withStyles, AppBar } from '@material-ui/core'

const styles = {
  root: {},
}

const RoomHeader = ({ children }) =>
  <AppBar position="static" color="primary">
    <Toolbar>
      {children}
    </Toolbar>
  </AppBar>

RoomHeader.propTypes = {
  children: node,
}

export default withStyles(styles)(RoomHeader)
