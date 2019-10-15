import React, { Component } from 'react'
import { object, shape, func, bool } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { actions, select, connect } from 'src/redux'
import { RoomLoader, Route, LeftNavigation } from 'components'
import AuthScene from './@auth/AuthScene'

const styles = () => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
  leftNavigation: {
    height: '100%',
  }
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
    const { classes, match } = this.props
    return (
      <div className={classes.root}>
        <LeftNavigation className={classes.leftNavigation} />
        <RoomLoader
          id={match.params.id}
          onJoin={this.joinRoom}
          onLeave={this.leaveRoom}
        />
        <Route
          path="/rooms/:id/auth"
          component={AuthScene}
          onClose={history.goBack}
          onAuth={this.joinRoom}
        />
      </div>
    )
  }
}

RoomLayout.propTypes = {
  classes: object.isRequired,
  match: shape({ params: object }),
  history: shape({ push: func.isRequired, }),
  redux: shape({
    isGuest: bool.isRequired,
    leaveRoom: func.isRequired,
    joinRoom: func.isRequired,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  isGuest: !select.rooms.guests.exist(state, id),
  leaveRoom: actions.rooms.leave,
  joinRoom: actions.rooms.join,
})

export default withStyles(styles)(connect(redux)(RoomLayout))
