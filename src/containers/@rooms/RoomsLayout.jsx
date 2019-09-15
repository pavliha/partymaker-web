import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import RoomsScene from './RoomsScene'
import RoomLayout from './@id/RoomLayout'
import { Header } from 'components'
import { userShape } from 'shapes'
import { connect, select } from 'src/redux'
import { shape } from 'prop-types'

const RoomsLayout = ({ redux: { user } }) =>
  <Fragment>
    <Header user={user} />
    <Switch>
      <Route exact path="/rooms" component={RoomsScene} />
      <Route path="/rooms/:id" component={RoomLayout} />
    </Switch>
  </Fragment>

RoomsLayout.propTypes = {
  redux: shape({
    user: userShape,
  })
}

const redux = state => ({
  user: select.auth.user(state),
})

export default connect(redux)(RoomsLayout)
