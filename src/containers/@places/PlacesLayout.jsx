import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loading from 'components/loaders/Loading'

const PlaceScene = lazy(() => import('./@id/PlaceScene'))

const PlacesLayout = () =>
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/places/:id" component={PlaceScene} />
    </Switch>
  </Suspense>

export default PlacesLayout
