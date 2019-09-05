import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import OrderScene from './@id/OrderScene'

const styles = {
  root: {},
}

const OrderLayout = ({ classes }) =>
  <Switch className={classes.root}>
    <Route exact path="/orders/:id" component={OrderScene} />
  </Switch>

OrderLayout.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(OrderLayout)
