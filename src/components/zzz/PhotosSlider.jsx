import React, { Component } from 'react'
import { object, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { photoShape } from 'shapes'
import { PictureDialog } from 'components'

const styles = theme => ({
  root: {
    display: 'flex',
    overflowX: 'scroll',
    height: 120,
    [theme.breakpoints.up('md')]: {
      height: 250
    }
  },

  photo: {
    height: 120,
    [theme.breakpoints.up('md')]: {
      height: 250
    },
    borderRadius: 5,
    marginRight: 10,
    '&:first-child': {
      marginLeft: 10,
    },
    '&:last-child': {
      paddingRight: 10,
    },
  },
})

class PhotosSlider extends Component {

  state = {
    photo: null
  }

  open = photo => () =>
    this.setState({ photo })

  close = () =>
    this.setState({ photo: null })

  render() {
    const { classes, photos } = this.props
    const { photo } = this.state

    return (
      <div className={classes.root}>
        {photos.map(photo =>
          <img
            key={photo.id}
            alt={photo.url}
            src={photo.url}
            onClick={this.open(photo)}
            className={classes.photo} />
        )}
        <PictureDialog
          url={photo?.url}
          isOpen={!!photo}
          onClose={this.close}
        />
      </div>
    )
  }
}

PhotosSlider.propTypes = {
  classes: object.isRequired,
  photos: arrayOf(photoShape),
}

export default withStyles(styles)(PhotosSlider)
