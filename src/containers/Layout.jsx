import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthLayout from './@auth/AuthLayout'
import IndexScene from './IndexScene'

const Layout = () =>
  <Switch>
    <Route exact path="/" component={IndexScene} />
    <Route path="/auth" component={AuthLayout} />
  </Switch>

export default Layout
