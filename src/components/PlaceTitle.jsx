import React, { Component } from 'react'
import { object, bool, shape, func, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import roomShape from 'shapes/room'
import { withRouter } from 'react-router-dom'
import { EntertainmentsDrawer, Picture, PlaceDialog, DateTimeStatus } from 'components'

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

  openPlacesDrawer = () => {
    const { history, room } = this.props
    history.push(`/rooms/${room.id}/entertainments`)
  }

  closePlacesDrawer = () => {
    const { history, room } = this.props
    history.push(`/rooms/${room.id}/place`)
  }

  openPlaceDrawer = () => {
    const { history, room } = this.props
    history.push(`/rooms/${room.id}/place`)
  }

  closePlaceDrawer = () => {
    const { history, room } = this.props
    history.push(`/rooms/${room.id}`)
  }

  render() {
    const { location, classes, isGuest, room } = this.props
    const { place } = room

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
          room_id={room.id}
          isOpen={location.pathname === `/rooms/${room.id}/entertainments`}
          onClose={this.closePlacesDrawer}
        />
        {place && (
          <PlaceDialog
            title="Место"
            datetime={<DateTimeStatus time={room.time} date={room.date} />}
            place={place}
            isGuest={isGuest}
            isOpen={location.pathname === `/rooms/${room.id}/place`}
            onClose={this.closePlaceDrawer}
            onReplace={this.openPlacesDrawer}
          />
        )}

      </div>
    )
  }
}

PlaceTitle.propTypes = {
  location: shape({ pathname: string }),
  history: shape({ push: func }),
  classes: object.isRequired,
  isGuest: bool,
  room: roomShape,
}

export default withStyles(styles)(withRouter(PlaceTitle))
