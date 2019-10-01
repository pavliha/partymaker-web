import React, { Component } from 'react'
import { object, func, bool, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import userShape from 'shapes/user'
import roomShape from 'shapes/room'
import { Loading, Messages, ChatForm, RoomNavigation, ScrollableBody, Form } from 'components'
import { actions, connect, select } from 'src/redux'
import background from 'assets/images/chat-background.jpg'

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  titles: {
    paddingLeft: 13,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
    padding: '5px 0',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inherit'
    }
  },
  navigation: {
    flex: 1,
  },
  chatBody: {
    background: `url(${background})`,
  }
})

class Chat extends Component {

  chatBody = React.createRef()

  state = {
    page: 1,
    limit: 20,
    isLoading: true
  }

  async componentDidMount() {
    const { socket } = this.props
    await this.load()
    this.chatBody.current.forceScrollToBottom()
    socket && socket.on('message', this.scrollBottom)
  }

  load = async (page = 1) => {
    const { onLoad } = this.props
    const { limit } = this.state
    this.setState({ page, isLoading: true })
    const result = await onLoad({ page, limit })
    this.setState({ isLoading: false })
    return result
  }

  sendMessage = form => {
    const { onSend } = this.props
    const action = onSend(form)
    this.scrollBottom()
    return action
  }

  loadMoreMessages = () => {
    const { room } = this.props
    const { page, limit } = this.state
    if (room.totalMessages <= page * limit) return null
    return this.load(page + 1)
  }

  scrollBottom = () =>
    this.chatBody.current.scrollToBottom()

  render() {
    const { classes, room, onLeave, onJoin, redux: { auth, isGuest, orderPlace }, } = this.props
    const { isLoading } = this.state

    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <RoomNavigation
            className={classes.navigation}
            room={room}
            isGuest={isGuest}
            onLeave={onLeave}
            onJoin={onJoin}
          />
        </header>
        <div className={classes.body}>
          <ScrollableBody
            className={classes.chatBody}
            ref={this.chatBody}
            onScrollTop={this.loadMoreMessages}
          >
            {isLoading && <Loading className={classes.loading} />}
            <Messages messages={room.messages || []} />
          </ScrollableBody>
          <Form
            component={ChatForm}
            auth={auth}
            isGuest={isGuest}
            room={room}
            onJoin={onJoin}
            onSubmit={this.sendMessage}
            onOrder={orderPlace}
          />
        </div>
      </div>
    )
  }
}

Chat.propTypes = {
  classes: object.isRequired,
  socket: shape({ on: func }),
  room: roomShape.isRequired,
  onLoad: func.isRequired,
  onSend: func.isRequired,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
  redux: shape({
    auth: userShape,
    isGuest: bool,
    orderPlace: func.isRequired,
  })
}

const redux = (state, { room: { id } }) => ({
  auth: select.auth.user(state),
  isGuest: !select.rooms.guests.exist(state, id),
  orderPlace: actions.orders.create,
})

export default withStyles(styles)(connect(redux)(Chat))
