import React, { Fragment } from 'react'
import { func, node, number, oneOfType, shape, string } from 'prop-types'
import placeShape from 'shapes/place'
import { Loader, Place } from 'components'
import { actions, connect, select } from 'src/redux'
import { Helmet } from 'react-helmet'

const PlaceLoader = ({ className, id, actions, redux: { place, loadPlace } }) =>
  <Loader params={id} load={loadPlace}>
    {place && (
      <Fragment>
        <Helmet><title>{place.title}</title></Helmet>
        <Place
          className={className}
          place={place}
          actions={actions}
        />
      </Fragment>
    )}
  </Loader>

PlaceLoader.propTypes = {
  id: oneOfType([string, number]).isRequired,
  className: string,
  actions: node,
  redux: shape({
    place: placeShape,
    loadPlace: func.isRequired,
    createRoom: func.isRequired,
  })
}

const redux = (state, { id }) => ({
  place: select.places.current(state, id),
  loadPlace: actions.places.load,
  createRoom: actions.rooms.create,
})

export default connect(redux)(PlaceLoader)
