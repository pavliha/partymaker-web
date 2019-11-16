import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import EntertainmentsScene from './EntertainmentsScene'
import { withStyles } from '@material-ui/core'
import Loading from 'components/loaders/Loading'

const EntertainmentScene = lazy(() => import('./@id/EntertainmentScene'))

const styles = () => ({})

const EntertainmentsLayout = () =>
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/" component={EntertainmentsScene} />
      <Route exact path="/entertainments" component={EntertainmentsScene} />
      <Route exact path="/entertainments/:id" component={EntertainmentScene} />
    </Switch>
  </Suspense>

export default withStyles(styles)(EntertainmentsLayout)
