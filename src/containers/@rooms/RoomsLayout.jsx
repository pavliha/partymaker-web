import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import RoomsScene from './RoomsScene'
import { Header } from 'components'
import { connect, select } from 'src/redux'

const RoomsLayout = ({ redux: { user } }) =>
  <Fragment>
    <Header user={user} />
    <Switch>
      <Route exact path="/rooms" component={RoomsScene} />
    </Switch>
  </Fragment>

const redux = state => ({
  user: select.auth.user(state)
})

export default connect(redux)(RoomsLayout)
