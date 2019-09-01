import React, { Component } from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import roomShape from 'shapes/room'
import { EntertainmentsDrawer, Picture, PlaceDialog } from 'components'
import moment from 'moment'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  picture: {
    width: '90px',
    height: 50,
    marginRight: 5,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  title: {
    cursor: 'pointer',
    fontSize: 14,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
  },
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
    const { classes, room: { place, id, date, time } } = this.props
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
          room_id={id}
          isOpen={isSelectPlaceDrawerOpen}
          onClose={this.closePlacesDrawer}
        />
        {place && (
          <PlaceDialog
            title="Место"
            datetime={`${moment(date).format('D MMMM, dddd')} ${time}`}
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
  room: roomShape,
}

export default withStyles(styles)(PlaceTitle)
