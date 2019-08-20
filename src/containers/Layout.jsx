import React from 'react'
import { Route, Switch } from 'react-router-dom'
import IndexScene from './IndexScene'
import AuthLayout from './@auth/AuthLayout'

const Layout = () =>
  <Switch>
    <Route exact path="/" component={IndexScene} />
    <Route path="/auth" component={AuthLayout} />
  </Switch>

export default Layout
