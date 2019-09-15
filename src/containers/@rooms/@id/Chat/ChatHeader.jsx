import React, { Component } from 'react'
import { bool, func, object } from 'prop-types'
import roomShape from 'shapes/room'
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

  openGuests = () =>
    this.setState({ isGuestsDrawerOpen: true })

  closeGuests = () =>
    this.setState({ isGuestsDrawerOpen: false })

  render() {
    const { classes, room, isGuest, onJoin, onLeave } = this.props
    const { isGuestsDrawerOpen } = this.state

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
          isOpen={isGuestsDrawerOpen}
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
  isGuest: bool,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
}

export default withStyles(styles)(ChatHeader)
