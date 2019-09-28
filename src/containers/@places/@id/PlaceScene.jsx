import React, { Component } from 'react'
import { string, shape } from 'prop-types'
import { PlaceLoader, PlaceActions, DefaultHeader } from 'components'

class PlaceScene extends Component {

  render() {
    const { match } = this.props

    return (
      <div>
        <DefaultHeader back />
        <PlaceLoader
          id={match.params.id}
          actions={<PlaceActions place_id={match.params.id} />}
        />
      </div>
    )
  }
}

PlaceScene.propTypes = {
  match: shape({ params: shape({ id: string }) }),
}

export default PlaceScene
