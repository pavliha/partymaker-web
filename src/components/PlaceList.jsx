import React from 'react'
import { arrayOf, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { PlaceCard } from 'components'

const styles = {
  root: {},
}

const PlaceList = ({ places, action }) =>
  places.map(place =>
    <PlaceCard
      key={place.id}
      place={place}
      action={action(place)}
    />
  )

PlaceList.propTypes = {
  places: arrayOf(placeShape).isRequired,
  onSelect: func,
  action: func,
}
PlaceList.defaultProps = {
  action: () => {},
}

export default withStyles(styles)(PlaceList)
