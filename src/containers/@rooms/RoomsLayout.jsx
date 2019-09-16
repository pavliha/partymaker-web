import React, { Fragment, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Header, Loading } from 'components'
import { userShape } from 'shapes'
import { connect, select } from 'src/redux'
import { shape } from 'prop-types'

const RoomLayout = lazy(() => import('./@id/RoomLayout'))

const RoomsLayout = ({ redux: { user } }) =>
  <Fragment>
    <Header user={user} />
    <Suspense fallback={<Loading center />}>
      <Switch>
        <Route path="/rooms/:id" component={RoomLayout} />
      </Switch>
    </Suspense>
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
