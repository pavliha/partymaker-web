import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Chat, RoomAside } from 'components'
import roomShape from 'shapes/room'
import userShape from 'shapes/user'
import { actions, connect, select } from 'src/redux'

const styles = () => ({
  root: {
    display: 'flex',
    maxHeight: '100%',
    flexGrow: 1,
  },
})

class Room extends Component {

  topic = null

  state = {
    socket: null,
  }

  constructor(props) {
    super(props)
    const { redux: { subscribe, auth }, room } = props
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
    const { classes, room, onJoin, onLeave, redux, } = this.props
    const { socket } = this.state

    return (
      <section className={classes.root}>
        <Chat
          socket={socket}
          room={room}
          onLoad={redux.loadMessages}
          onSend={redux.sendMessage}
          onJoin={onJoin}
          onLeave={onLeave}
        />
        <RoomAside room={room} />
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
    subscribe: func.isRequired,
    unsubscribe: func.isRequired,
  })
}

const redux = (state, { room: { id } }) => ({
  auth: select.auth.user(state),
  loadMessages: params => actions.rooms.messages.loadMany(id, params),
  sendMessage: form => actions.rooms.messages.create(id, form),
  subscribe: actions.rooms.subscribe,
  unsubscribe: actions.rooms.unsubscribe,
})

export default withStyles(styles)(connect(redux)(Room))
