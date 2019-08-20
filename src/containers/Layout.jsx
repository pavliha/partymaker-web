import React from 'react'
import { Route, Switch } from 'react-router-dom'
import IndexScene from './IndexScene'

const Layout = () =>
  <Switch>
    <Route exact path="/" component={IndexScene} />
  </Switch>

export default Layout
