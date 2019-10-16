import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Chat, RoomDrawer } from 'components'
import roomShape from 'shapes/room'
import userShape from 'shapes/user'
import { actions, connect, select } from 'src/redux'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import InformationIcon from 'mdi-react/InformationIcon'

const styles = (theme) => ({
  root: {
    display: 'flex',
    maxHeight: '100%',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 378,
  },
  infoIcon: {
    color: 'rgba(0,0,0,0.8)'
  }
})

class Room extends Component {

  topic = null

  state = {
    socket: null,
    isRoomDrawerOpen: true,
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

  showRoomDrawer = () =>
    this.setState({ isRoomDrawerOpen: true })

  hideRoomDrawer = () =>
    this.setState({ isRoomDrawerOpen: false })

  render() {
    const { classes, room, onJoin, onLeave, redux, } = this.props
    const { socket, isRoomDrawerOpen } = this.state

    const chatStyle = classNames({
      [classes.content]: true,
      [classes.contentShift]: isRoomDrawerOpen
    })

    return (
      <section className={classes.root}>
        <Chat
          className={chatStyle}
          socket={socket}
          room={room}
          onLoad={redux.loadMessages}
          onSend={redux.sendMessage}
          onJoin={onJoin}
          onLeave={onLeave}
          action={!isRoomDrawerOpen && (
            <IconButton className={classes.infoIcon} onClick={this.showRoomDrawer}>
              <InformationIcon />
            </IconButton>
          )}
        />
        <RoomDrawer
          room={room}
          isOpen={isRoomDrawerOpen}
          onClose={this.hideRoomDrawer}
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
