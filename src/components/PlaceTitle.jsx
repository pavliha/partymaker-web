import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  picture: {
    backgroundImage: (p) => `url(${p.place?.picture_url})`,
    backgroundColor: 'rgba(0,0,0,0.12)',
    width: '90px',
    height: 50,
    borderRadius: 3,
    marginRight: 5,
  },
  title: {
    fontSize: 18,
  }
})

const PlaceTitle = ({ classes, place }) =>
  <div className={classes.root}>
    <div className={classes.picture} />
    <div>
      <Typography className={classes.title}>{place?.title || 'Выбрать место'}</Typography>
      <Typography color="textSecondary" variant="caption">{place?.price || 'Место еще не выбрано'}</Typography>
    </div>
  </div>

PlaceTitle.propTypes = {
  classes: object.isRequired,
  place: placeShape,
}

export default withStyles(styles)(PlaceTitle)
