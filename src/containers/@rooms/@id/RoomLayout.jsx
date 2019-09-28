import React, { Component } from 'react'
import { object, shape, func, bool } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { actions, select, connect } from 'src/redux'
import { roomShape, userShape } from 'shapes'
import { Route } from 'react-router-dom'
import { Load, AuthDialog, Room, RoomHeader } from 'components'

const styles = () => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
  },
})

class RoomLayout extends Component {

  joinRoom = async () => {
    const { history, redux: { auth, joinRoom, room, subscribe } } = this.props
    if (!auth) return history.push(`/rooms/${room.id}/auth`)
    await joinRoom(room.id)
    history.push(`/rooms/${room.id}`)
    this.topic = subscribe(room.id)
  }

  leaveRoom = async () => {
    const { redux: { leaveRoom, room, unsubscribe } } = this.props
    await leaveRoom(room.id)
    this.topic = null
    unsubscribe(room.id)
  }

  render() {
    const { classes, redux: { auth, room, loadRoom, isGuest } } = this.props
    return (
      <Load load={loadRoom}>
        {room && (
          <div className={classes.root}>
            <RoomHeader
              auth={auth}
              isGuest={isGuest}
              room={room}
              onJoin={this.leaveRoom}
              onLeave={this.leaveRoom}
            />
            <Room
              auth={auth}
              room={room}
              isGuest={isGuest}
              onJoin={this.joinRoom}
              onLeave={this.leaveRoom}
            />

            <Route path="/rooms/:id/auth" render={({ history }) =>
              <AuthDialog
                isOpen
                onClose={history.goBack}
                onAuth={this.joinRoom}
              />
            }
            />
          </div>
        )}
      </Load>
    )
  }
}

RoomLayout.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func.isRequired, }),
  redux: shape({
    auth: userShape,
    room: roomShape,
    isGuest: bool.isRequired,
    loadRoom: func.isRequired,
    leaveRoom: func.isRequired,
    joinRoom: func.isRequired,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  auth: select.auth.user(state),
  room: select.rooms.current(state, id),
  isGuest: !select.rooms.guests.exist(state, id),
  loadRoom: () => actions.rooms.load(id),
  leaveRoom: actions.rooms.leave,
  joinRoom: actions.rooms.join,
})

export default withStyles(styles)(connect(redux)(RoomLayout))
