import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import EntertainmentScene from './@id/EntertainmentScene'
import EntertainmentsScene from './EntertainmentsScene'

const EntertainmentsLayout = () =>
  <Fragment>
    <Switch>
      <Route exact path="/entertainments" component={EntertainmentsScene} />
      <Route exact path="/entertainments/:id" component={EntertainmentScene} />
    </Switch>
  </Fragment>

export default EntertainmentsLayout
