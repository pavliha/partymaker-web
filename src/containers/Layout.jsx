import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthGate } from 'components'
import IndexScene from './IndexScene'
import AuthLayout from './@auth/AuthLayout'
import RoomsLayout from './@rooms/RoomsLayout'

const Layout = () =>
  <Switch>
    <Route exact path="/" component={IndexScene} />
    <Route path="/auth" component={AuthLayout} />
    <AuthGate path="/rooms" component={RoomsLayout} />
  </Switch>

export default Layout
