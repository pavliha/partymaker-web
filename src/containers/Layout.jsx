import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthLayout from './@auth/AuthLayout'
import IndexScene from './IndexScene'
import RoomsLayout from './@rooms/RoomsLayout'

const Layout = () =>
  <Switch>
    <Route exact path="/" component={IndexScene} />
    <Route path="/auth" component={AuthLayout} />
    <Route path="/rooms" component={RoomsLayout} />
  </Switch>

export default Layout
