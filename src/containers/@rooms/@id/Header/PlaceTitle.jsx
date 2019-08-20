import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  picture: {
    width: '90px',
    height: 50,
    borderRadius: 3,
    marginRight: 5,
  },
  title: {
    fontSize: 18,
  }
}

const PlaceTitle = ({ classes, place }) =>
  <div className={classes.root}>
    <img
      className={classes.picture}
      alt={place.title}
      src={place.picture_url}
    />
    <div>
      <Typography className={classes.title}>{place.title}</Typography>
      <Typography color="textSecondary" variant="caption">{place.price}</Typography>
    </div>
  </div>

PlaceTitle.propTypes = {
  classes: object.isRequired,
  place: placeShape,
}

export default withStyles(styles)(PlaceTitle)
