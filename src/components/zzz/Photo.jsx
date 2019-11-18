import React, { Component } from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import photoShape from 'shapes/photo'
import classNames from 'classnames'

const styles = {

  root: {
    userDrag: 'none',
    userSelect: 'none',
    display: 'block',
    overflow: 'hidden',
  },

  landscape: {
    width: 'calc(100% - 40px)',
    maxWidth: 1000,
  },

  portrait: {
    height: '100%',
    maxHeight: 800,
  }

}

class Photo extends Component {

  state = {
    orientation: null,
  }

  detectOrientation = (e) => {
    const img = e.target

    if (img.width > img.height) {
      this.setState({ orientation: 'landscape' })
    } else {
      this.setState({ orientation: 'portrait' })
    }
  }

  render() {
    const { classes, photo } = this.props
    const { orientation } = this.state

    return (
      <img
        className={classNames({
          [classes.root]: true,
          [classes.landscape]: orientation === 'landscape',
          [classes.portrait]: orientation === 'portrait',
        })}
        src={photo.url}
        loading="lazy"
        alt={photo.url}
        onLoad={this.detectOrientation}
      />
    )
  }
}

Photo.propTypes = {
  classes: object.isRequired,
  photo: photoShape.isRequired,
}

export default withStyles(styles)(Photo)
