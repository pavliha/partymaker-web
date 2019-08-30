import React, { Component } from 'react'
import { object, shape, string, func, bool } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { actions, select, connect } from 'src/redux'
import { Invite, Load, RoomTitle, AuthDialog } from 'components'
import Guests from './Guests'
import Chat from './Chat'
import Socket from 'services/Socket'

const styles = {
  root: {
    display: 'flex',
    maxHeight: 'calc(100vh - 65px)',
    flexGrow: 1,
  },
  guests: {
    width: 380,
    display: 'flex',
    flexDirection: 'column',
    borderRight: 'solid 1px rgba(0, 0, 0, 0.12)',
  },
}

class RoomScene extends Component {

  state = {
    isAuthDialogOpen: false,
  }

  constructor(props) {
    super(props)
    const { redux: { subscribe }, match } = props
    subscribe(match.params.id)
  }

  componentWillUnmount() {
    const { redux: { unsubscribe }, match } = this.props
    unsubscribe(match.params.id)
  }

  showAuthDialog = () =>
    this.setState({ isAuthDialogOpen: true })

  closeAuthDialog = () =>
    this.setState({ isAuthDialogOpen: false })

  joinRoom = async (room) => {
    const { redux: { auth_id, joinRoom } } = this.props
    if (!auth_id) return this.showAuthDialog()
    joinRoom(room.id)
  }

  leaveRoom = async (room) => {
    const { redux: { leaveRoom }, history } = this.props
    await leaveRoom(room.id)
    history.push('/rooms')
  }

  receiveMessage = (scrollBottom) => {
    if (!Socket.socket) return
    Socket.on('message', scrollBottom)
  }

  render() {
    const { classes, redux } = this.props
    const { isAuthDialogOpen } = this.state
    const { room, isGuest, loadMessages, loadRoom, sendMessage } = redux

    return (
      <Load promise={loadRoom}>
        {room && (
          <section className={classes.root}>
            <div className={classes.guests}>
              <RoomTitle room={room} action={<Invite invite_token={room.invite_token} />} />
              <Guests guests={room.guests} onKick={() => {}} />
            </div>
            <Chat
              room={room}
              isGuest={isGuest}
              onMount={this.receiveMessage}
              onLoad={loadMessages}
              onSend={sendMessage}
              onJoin={this.joinRoom}
              onLeave={this.leaveRoom}
            />
          </section>
        )}
        <AuthDialog
          isOpen={isAuthDialogOpen}
          onClose={this.closeAuthDialog}
          onAuth={this.closeAuthDialog}
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
    isGuest: bool.isRequired,
    loadRoom: func.isRequired,
    loadMessages: func.isRequired,
    leaveRoom: func.isRequired,
    joinRoom: func.isRequired,
    subscribe: func.isRequired,
    unsubscribe: func.isRequired,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  auth_id: state.auth.user_id,
  isGuest: !select.rooms.guests.exist(state, id),
  room: select.rooms.current(state, id),
  loadRoom: () => actions.rooms.load(id),
  loadMessages: params => actions.rooms.messages.loadMany(id, params),
  leaveRoom: actions.rooms.leave,
  joinRoom: actions.rooms.join,
  sendMessage: form => actions.rooms.messages.create(id, { ...form, user_id: state.auth.user_id }),
  subscribe: actions.rooms.subscribe,
  unsubscribe: actions.rooms.unsubscribe,
})

export default withStyles(styles)(connect(redux)(RoomScene))
