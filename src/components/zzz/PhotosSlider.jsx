import React, { Component } from 'react'
import { object, arrayOf, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { photoShape } from 'shapes'
import { PictureDialog } from 'components'
import classNames from 'classnames'
import appendFileNameSuffix from 'utils/appendFileNameSuffix'

const styles = theme => ({
  root: {
    display: 'flex',
    overflowX: 'scroll',
    height: 135,
    [theme.breakpoints.up('md')]: {
      height: 265
    }
  },

  photo: {
    height: 120,
    [theme.breakpoints.up('md')]: {
      height: 250
    },
    borderRadius: 5,
    marginRight: 10,
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
    const { classes, photos, className } = this.props
    const { photo } = this.state

    return (
      <div className={classNames([classes.root, className])}>
        {photos.map(photo =>
          <img
            key={photo.id}
            alt={photo.url}
            src={appendFileNameSuffix(photo.url, '-slide')}
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
  className: string,
  photos: arrayOf(photoShape),
}

export default withStyles(styles)(PhotosSlider)
