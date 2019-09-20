import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture } from 'components'

const styles = {
  root: {
    cursor: 'pointer',
    position: 'relative',
    margin: 10,
    width: 150,
    display: 'flex',
    flexDirection: 'column'
  },
  picture: {
    borderRadius: 25,
    width: 150,
    height: 150,
  },

  title: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 5,
  },
  secondaryButton: {
    color: 'rgba(0,0,0,0.54)'
  },
}

const PlaceCard = ({ classes, place }) =>
  <div className={classes.root}>
    <Picture src={place.picture_url} className={classes.picture} />
    <div className={classes.container}>
      <Typography className={classes.title}>{place.title}</Typography>
      <Typography color="textSecondary">{place.price}</Typography>
    </div>
  </div>

PlaceCard.propTypes = {
  classes: object.isRequired,
  place: placeShape.isRequired,
}

export default withStyles(styles)(PlaceCard)
