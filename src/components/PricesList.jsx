import React from 'react'
import { object, func, bool, string, array, shape, node } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'

const styles = {
  root: {},
}

const PricesList = ({ classes }) =>
  <List className={classes.root}>

  </List>

PricesList.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(PricesList)
