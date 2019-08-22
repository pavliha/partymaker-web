import React, { Component } from 'react'
import { object, shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { actions, select, connect } from 'src/redux'
import RoomTitle from './RoomTitle'
import { InviteButton, Load } from 'components'
import Guests from './Guests'
import Chat from './Chat'
import ChatHeader from './Header'

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
  chat: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    //maxHeight: 'calc(100vh - 65px)',
  }
}

class RoomScene extends Component {

  constructor(props) {
    super(props)
    const { redux: { subscribe }, match } = props
    subscribe(match.params.id)
  }

  componentWillUnmount() {
    const { redux: { unsubscribe }, match } = this.props
    unsubscribe(match.params.id)
  }

  render() {
    const { classes, redux } = this.props
    const { room, leaveRoom, loadMessages, loadRoom, sendMessage } = redux

    return (
      <Load promise={loadRoom}>
        <section className={classes.root}>
          <div className={classes.guests}>
            {room && <RoomTitle room={room} action={<InviteButton onClick={() => {}} />} />}
            {room?.guests && <Guests guests={room.guests} onKick={() => {}} />}
          </div>
          {room && (
            <div className={classes.chat}>
              <ChatHeader room={room} onLeave={leaveRoom} />
              <Chat
                messages={room.messages}
                invite_token={room.invite_token}
                totalMessages={room.totalMessages}
                onLoad={loadMessages}
                onSend={sendMessage}
              />
            </div>
          )}
        </section>
      </Load>
    )
  }
}

RoomScene.propTypes = {
  classes: object.isRequired,
  match: shape({ params: shape({ id: string.isRequired, }), }),
  redux: shape({
    loadRoom: func.isRequired,
    loadMessages: func.isRequired,
    leaveRoom: func.isRequired,
    subscribe: func.isRequired,
    unsubscribe: func.isRequired,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  room: select.rooms.current(state, id),
  loadRoom: () => actions.rooms.load(id),
  loadMessages: params => actions.rooms.messages.loadMany(id, params),
  leaveRoom: actions.rooms.leave,
  sendMessage: form => actions.rooms.messages.create(id, form),
  subscribe: actions.rooms.subscribe,
  unsubscribe: actions.rooms.unsubscribe,
})

export default withStyles(styles)(connect(redux)(RoomScene))
