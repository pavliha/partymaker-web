import React, { Component } from 'react'
import { number, object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { EntertainmentsDrawer } from 'components'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  picture: {
    cursor: 'pointer',
    backgroundImage: (p) => `url(${p.place?.picture_url})`,
    backgroundColor: 'rgba(0,0,0,0.12)',
    backgroundSize: 'cover',
    width: '90px',
    height: 50,
    borderRadius: 3,
    marginRight: 5,
  },
  title: {
    cursor: 'pointer',
    fontSize: 18,
  }
})

class PlaceTitle extends Component {

  state = {
    isDrawerOpen: false,
  }

  openPlacesDrawer = () =>
    this.setState({ isDrawerOpen: true })

  closePlacesDrawer = () =>
    this.setState({ isDrawerOpen: false })

  render() {
    const { classes, room_id, place } = this.props
    const { isDrawerOpen } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.picture} onClick={this.openPlacesDrawer} />
        <div>
          <Typography
            className={classes.title}
            onClick={this.openPlacesDrawer}
          >
            {place?.title || 'Выбрать место'}
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            {place?.price || 'Место еще не выбрано'}
          </Typography>
        </div>
        <EntertainmentsDrawer
          room_id={room_id}
          isOpen={isDrawerOpen}
          onClose={this.closePlacesDrawer}
        />
      </div>
    )
  }
}

PlaceTitle.propTypes = {
  classes: object.isRequired,
  place: placeShape,
  room_id: number,
}

export default withStyles(styles)(PlaceTitle)
