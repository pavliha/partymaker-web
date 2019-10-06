import React from 'react'
import { object, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { photoShape } from 'shapes'

const styles = {
  root: {
    display: 'flex',
    overflowX: 'scroll',
    height: 120,
  },

  photo: {
    height: 120,
    borderRadius: 5,
    marginRight: 10,
    '&:first-child': {
      marginLeft: 10,
    },
  },
}

const PhotosSlider = ({ classes, photos }) =>
  <div className={classes.root}>
    {photos.map(photo =>
      <img
        key={photo.id}
        alt={photo.url}
        src={photo.url}
        className={classes.photo} />
    )}
  </div>

PhotosSlider.propTypes = {
  classes: object.isRequired,
  photos: arrayOf(photoShape),
}

export default withStyles(styles)(PhotosSlider)
