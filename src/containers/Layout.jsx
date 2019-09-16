import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthGate, Loading } from 'components'

const IndexScene = lazy(() => import('./IndexScene'))
const RoomsLayout = lazy(() => import('./@rooms/RoomsLayout'))
const AuthLayout = lazy(() => import('./@auth/AuthLayout'))
const InviteScene = lazy(() => import('./@invite/InviteScene'))
const ProfileLayout = lazy(() => import('./@profile/ProfileLayout'))
const EntertainmentsScene = lazy(() => import('./@entertainments/EntertainmentsScene'))
const OrderScene = lazy(() => import('./@order/OrderScene'))

const Layout = () =>
  <Suspense fallback={<Loading center />}>
    <Switch>
      <Route exact path="/" component={IndexScene} />
      <Route path="/auth" component={AuthLayout} />
      <Route path="/entertainments" component={EntertainmentsScene} />
      <Route exact path="/invite/:invite_token" component={InviteScene} />
      <Route path="/rooms" component={RoomsLayout} />
      <Route path="/order/:token" component={OrderScene} />
      <AuthGate path="/profile" component={ProfileLayout} />
    </Switch>
  </Suspense>

export default Layout
