import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import RoomLayout from './@id/RoomLayout'

const RoomsLayout = () =>
  <Fragment>
    <Switch>
      <Route path="/rooms/:id" component={RoomLayout} />
    </Switch>
  </Fragment>

export default RoomsLayout
