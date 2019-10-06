import React, { Component } from 'react'
import { func, node, number, oneOfType, shape, string } from 'prop-types'
import placeShape from 'shapes/place'
import { Place, Load } from 'components'
import { select, connect, actions } from 'src/redux'

class PlaceLoader extends Component {

  load = () => {
    const { id, redux: { loadPlace } } = this.props
    return loadPlace(id)
  }

  render() {
    const { className, actions, redux: { place } } = this.props

    return (
      <Load load={this.load}>
        {place && (
          <Place
            className={className}
            place={place}
            actions={actions}
          />
        )}
      </Load>
    )
  }
}

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
