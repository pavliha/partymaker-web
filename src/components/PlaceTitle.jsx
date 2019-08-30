import React, { Component } from 'react'
import { number, object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { EntertainmentsDrawer, Picture, PlaceDialog } from 'components'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  picture: {
    width: '90px',
    height: 50,
    marginRight: 5,
  },
  title: {
    cursor: 'pointer',
    fontSize: 18,
  }
})

class PlaceTitle extends Component {

  state = {
    isSelectPlaceDrawerOpen: false,
    inPlaceDialogOpen: false,
  }

  openPlacesDrawer = () =>
    this.setState({ isSelectPlaceDrawerOpen: true })

  closePlacesDrawer = () =>
    this.setState({ isSelectPlaceDrawerOpen: false })

  openPlaceDrawer = () =>
    this.setState({ inPlaceDialogOpen: true })

  closePlaceDrawer = () =>
    this.setState({ inPlaceDialogOpen: false })

  render() {
    const { classes, room_id, place } = this.props
    const { isSelectPlaceDrawerOpen, inPlaceDialogOpen } = this.state

    const handleClick = place ? this.openPlaceDrawer : this.openPlacesDrawer

    return (
      <div className={classes.root}>
        <Picture
          src={place?.picture_url}
          className={classes.picture}
          onClick={handleClick}
        />
        <div>
          <Typography
            className={classes.title}
            onClick={handleClick}
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
          isOpen={isSelectPlaceDrawerOpen}
          onClose={this.closePlacesDrawer}
        />
        {place && (
          <PlaceDialog
            title="Место"
            place={place}
            isOpen={inPlaceDialogOpen}
            onClose={this.closePlaceDrawer}
            onReplace={this.openPlacesDrawer}
          />
        )}
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
