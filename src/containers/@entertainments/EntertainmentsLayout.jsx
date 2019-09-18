import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import EntertainmentsScene from './EntertainmentsScene'
import EntertainmentScene from './@id/EntertainmentScene'

const styles = {
  root: {},
}

const EntertainmentsLayout = () =>
  <Fragment>
    <Switch>
      <Route exact path="/entertainments/:id" component={EntertainmentScene} />
      <Route exact path="/entertainments" component={EntertainmentsScene} />
    </Switch>
  </Fragment>

export default withStyles(styles)(EntertainmentsLayout)
