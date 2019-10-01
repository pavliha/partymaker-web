import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { GuestList, Invite, RoomTitle, Chat } from 'components'
import roomShape from 'shapes/room'
import userShape from 'shapes/user'
import { actions, connect } from 'src/redux'

const styles = theme => ({
  root: {
    display: 'flex',
    maxHeight: 'calc(100% - 65px)',
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

  state = {
    socket: null,
  }

  constructor(props) {
    super(props)
    const { redux: { subscribe }, room, auth } = props
    this.topic = auth && subscribe(room.id)
  }

  async componentDidMount() {
    if (!this.topic) return
    const socket = await this.topic
    this.setState({ socket })
  }

  componentWillUnmount() {
    const { redux: { unsubscribe }, room } = this.props
    unsubscribe(room.id)
    this.topic = null
  }

  render() {
    const { classes, room, onJoin, onLeave, redux } = this.props
    const { socket } = this.state

    return (
      <section className={classes.root}>
        <div className={classes.guests}>
          <RoomTitle room={room} action={<Invite room={room} />} />
          <GuestList
            guests={room.guests}
            onKick={redux.kickGuest}
          />
        </div>
        <Chat
          socket={socket}
          room={room}
          onLoad={redux.loadMessages}
          onSend={redux.sendMessage}
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
  auth: userShape,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
  redux: shape({
    loadMessages: func.isRequired,
    sendMessage: func.isRequired,
    kickGuest: func.isRequired,
    subscribe: func.isRequired,
    unsubscribe: func.isRequired,
  })
}

const redux = (state, { room: { id } }) => ({
  loadMessages: params => actions.rooms.messages.loadMany(id, params),
  sendMessage: form => actions.rooms.messages.create(id, form),
  kickGuest: guest => actions.rooms.guests.kick(id, guest.id),
  subscribe: actions.rooms.subscribe,
  unsubscribe: actions.rooms.unsubscribe,
})

export default withStyles(styles)(connect(redux)(Room))
