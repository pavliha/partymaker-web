import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Guests, Invite, RoomTitle } from 'components'
import roomShape from 'shapes/room'
import userShape from 'shapes/user'
import Chat from './Chat'
import { actions, connect, select } from 'src/redux'

const styles = theme => ({
  root: {
    display: 'flex',
    maxHeight: 'calc(100vh - 65px)',
    flexGrow: 1,
  },
  guests: {
    display: 'none',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      borderRight: 'solid 1px rgba(0, 0, 0, 0.12)',
      width: 380,
    }
  },
})

class Room extends Component {

  topic = null

  constructor(props) {
    super(props)
    const { redux: { subscribe, auth }, room } = props
    this.topic = auth && subscribe(room.id)
  }

  componentWillUnmount() {
    const { redux: { unsubscribe }, room } = this.props
    unsubscribe(room.id)
    this.topic = null
  }

  receiveMessage = async (scrollBottom) => {
    if (!this.topic) return
    const socket = await this.topic
    socket.on('message', scrollBottom)
  }

  render() {
    const { classes, room, onJoin, onLeave, redux } = this.props
    const { loadMessages, sendMessage, kickGuest } = redux

    return (
      <section className={classes.root}>
        <div className={classes.guests}>
          <RoomTitle room={room} action={<Invite room={room} />} />
          <Guests
            guests={room.guests}
            onKick={kickGuest}
          />
        </div>
        <Chat
          room={room}
          onMount={this.receiveMessage}
          onLoad={loadMessages}
          onSend={sendMessage}
          onJoin={onJoin}
          onLeave={onLeave}
        />
      </section>
    )
  }
}

Room.propTypes = {
  classes: object.isRequired,
  room: roomShape,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
  redux: shape({
    auth: userShape,
    loadMessages: func.isRequired,
    sendMessage: func.isRequired,
    kickGuest: func.isRequired,
    subscribe: func.isRequired,
    unsubscribe: func.isRequired,
  })
}

const redux = (state, { room: { id } }) => ({
  auth: select.auth.user(state),
  loadMessages: params => actions.rooms.messages.loadMany(id, params),
  sendMessage: form => actions.rooms.messages.create(id, form),
  kickGuest: guest => actions.rooms.guests.kick(id, guest.id),
  subscribe: actions.rooms.subscribe,
  unsubscribe: actions.rooms.unsubscribe,
})

export default withStyles(styles)(connect(redux)(Room))
