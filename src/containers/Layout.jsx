import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthGate } from 'components'
import IndexScene from './IndexScene'
import AuthLayout from './@auth/AuthLayout'
import RoomsLayout from './@rooms/RoomsLayout'
import ProfileLayout from './@profile/ProfileLayout'
import InviteScene from './@invite/InviteScene'
import OrderScene from './@order/OrderScene'
import EntertainmentsScene from './@entertainments/EntertainmentsScene'

const Layout = () =>
  <Switch>
    <Route exact path="/" component={IndexScene} />
    <Route path="/auth" component={AuthLayout} />
    <Route path="/entertainments" component={EntertainmentsScene} />
    <Route exact path="/invite/:invite_token" component={InviteScene} />
    <Route path="/rooms" component={RoomsLayout} />
    <Route path="/order/:token" component={OrderScene} />
    <AuthGate path="/profile" component={ProfileLayout} />
  </Switch>

export default Layout
