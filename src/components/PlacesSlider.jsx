import React from 'react'
import { arrayOf, object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { PlaceCard } from 'components'

const styles = {
  root: {
    display: 'flex',
    overflow: 'auto',
  },
}

const PlacesSlider = ({ classes, places }) =>
  <div className={classes.root}>
    {places.map(place => <PlaceCard key={place.id} place={place} />)}
  </div>

PlacesSlider.propTypes = {
  classes: object.isRequired,
  places: arrayOf(placeShape).isRequired,
}
PlacesSlider.defaultProps = {
  action: () => {},
}

export default withStyles(styles)(PlacesSlider)
