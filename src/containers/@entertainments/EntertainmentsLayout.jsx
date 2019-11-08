import React from 'react'
import { Route, Switch } from 'react-router-dom'
import EntertainmentScene from './@id/EntertainmentScene'
import EntertainmentsScene from './EntertainmentsScene'
import { withStyles } from '@material-ui/core'

const styles = () => ({})

const EntertainmentsLayout = () =>
  <Switch>
    <Route exact path="/" component={EntertainmentsScene} />
    <Route exact path="/entertainments" component={EntertainmentsScene} />
    <Route exact path="/entertainments/:id" component={EntertainmentScene} />
  </Switch>

export default withStyles(styles)(EntertainmentsLayout)
