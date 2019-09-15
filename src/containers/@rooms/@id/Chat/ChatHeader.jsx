import React, { Component } from 'react'
import { bool, func, object, shape, string } from 'prop-types'
import roomShape from 'shapes/room'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { ChatMenu, DateTimeStatus, PlaceTitle, GuestsDrawer } from 'components'

const styles = theme => ({
  root: {
    display: 'flex',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 8px',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
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

class ChatHeader extends Component {

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
    const { classes, location, room, isGuest, onJoin, onLeave } = this.props

    return (
      <div className={classes.root}>
        <PlaceTitle room={room} isGuest={isGuest} />
        <div className={classes.aside}>
          <DateTimeStatus
            className={classes.datetime}
            date={room.date}
            time={room.time}
          />
          <ChatMenu
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

ChatHeader.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
  history: shape({ push: func }),
  location: shape({ pathname: string }),
  isGuest: bool,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
}

export default withStyles(styles)(withRouter(ChatHeader))
