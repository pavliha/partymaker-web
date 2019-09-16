import React, { Component } from 'react'
import { bool, func, object, shape, string } from 'prop-types'
import roomShape from 'shapes/room'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { ChatDropdown, DateTimeStatus, PlaceTitle, GuestsDrawer } from 'components'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px 5px',
    [theme.breakpoints.up('md')]: {
      padding: '8px 20px',
    }
  },
  aside: {
    display: 'flex',
    alignItems: 'center'
  },

  datetime: {
    paddingRight: 20,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    }
  }
})

class RoomNavigation extends Component {

  state = {
    isGuestsDrawerOpen: false,
  }

  openGuests = () => {
    const { history, room } = this.props
    history.push(`/rooms/${room.id}/guests`)
  }

  closeGuests = () => {
    const { history, room } = this.props
    history.push(`/rooms/${room.id}`)
  }

  render() {
    const { classes, className, location, room, isGuest, onJoin, onLeave } = this.props

    return (
      <div className={classNames(classes.root, className)}>
        <PlaceTitle room={room} isGuest={isGuest} />
        <div className={classes.aside}>
          <DateTimeStatus
            className={classes.datetime}
            date={room.date}
            time={room.time}
          />
          <ChatDropdown
            room={room}
            isGuest={isGuest}
            onJoin={onJoin}
            onLeave={onLeave}
          />
        </div>
        <GuestsDrawer
          anchor="left"
          room={room}
          isOpen={location.pathname === `/rooms/${room.id}/guests`}
          onClose={this.closeGuests}
          onOpen={this.openGuests}
        />
      </div>
    )
  }
}

RoomNavigation.propTypes = {
  classes: object.isRequired,
  className: string,
  room: roomShape.isRequired,
  history: shape({ push: func }),
  location: shape({ pathname: string }),
  isGuest: bool,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
}

export default withStyles(styles)(withRouter(RoomNavigation))
