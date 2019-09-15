import React, { Component } from 'react'
import { object, shape, string, func, bool } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { actions, select, connect } from 'src/redux'
import { userShape, roomShape } from 'shapes'
import { Route } from 'react-router-dom'
import { Invite, Load, RoomTitle, Guests, AuthDialog } from 'components'
import Chat from './Chat'

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

class RoomScene extends Component {

  topic = null

  constructor(props) {
    super(props)
    const { redux: { subscribe, auth }, match } = props
    this.topic = auth && subscribe(match.params.id)
  }

  componentWillUnmount() {
    const { redux: { unsubscribe }, match } = this.props
    unsubscribe(match.params.id)
    this.topic = null
  }

  joinRoom = async () => {
    const { history, redux: { auth, joinRoom, room, subscribe } } = this.props
    if (!auth) return history.push(`/rooms/${room.id}/auth`)
    await joinRoom(room.id)
    history.push(`/rooms/${room.id}`)
    this.topic = subscribe(room.id)
  }

  leaveRoom = async () => {
    const { redux: { leaveRoom, room, unsubscribe }, history } = this.props
    await leaveRoom(room.id)
    this.topic = null
    unsubscribe(room.id)
    history.push('/rooms')
  }

  receiveMessage = async (scrollBottom) => {
    if (!this.topic) return
    const socket = await this.topic
    socket.on('message', scrollBottom)
  }

  render() {
    const { classes, redux } = this.props
    const { auth, room, isGuest, loadMessages, loadRoom, sendMessage, orderPlace, kickGuest } = redux

    return (
      <Load promise={loadRoom}>
        {room && (
          <section className={classes.root}>
            <div className={classes.guests}>
              <RoomTitle room={room} action={<Invite room={room} />} />
              <Guests
                guests={room.guests}
                onKick={kickGuest}
              />
            </div>
            <Chat
              auth={auth}
              room={room}
              isGuest={isGuest}
              onMount={this.receiveMessage}
              onLoad={loadMessages}
              onSend={sendMessage}
              onJoin={this.joinRoom}
              onLeave={this.leaveRoom}
              onOrder={orderPlace}
            />
          </section>
        )}
        <Route
          path="/rooms/:id/auth"
          render={({ history }) =>
            <AuthDialog
              isOpen
              onClose={history.goBack}
              onAuth={this.joinRoom}
            />
          }
        />
      </Load>
    )
  }
}

RoomScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func.isRequired, }),
  match: shape({ params: shape({ id: string.isRequired, }), }),
  redux: shape({
    auth: userShape,
    room: roomShape,
    isGuest: bool.isRequired,
    loadRoom: func.isRequired,
    loadMessages: func.isRequired,
    leaveRoom: func.isRequired,
    joinRoom: func.isRequired,
    orderPlace: func.isRequired,
    subscribe: func.isRequired,
    unsubscribe: func.isRequired,
    sendMessage: func.isRequired,
    kickGuest: func.isRequired,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  auth: select.auth.user(state),
  room: select.rooms.current(state, id),
  isGuest: !select.rooms.guests.exist(state, id),
  loadRoom: () => actions.rooms.load(id),
  loadMessages: params => actions.rooms.messages.loadMany(id, params),
  leaveRoom: actions.rooms.leave,
  joinRoom: actions.rooms.join,
  sendMessage: form => actions.rooms.messages.create(id, form),
  orderPlace: actions.orders.create,
  kickGuest: guest => actions.rooms.guests.kick(id, guest.id),
  subscribe: actions.rooms.subscribe,
  unsubscribe: actions.rooms.unsubscribe,
})

export default withStyles(styles)(connect(redux)(RoomScene))
