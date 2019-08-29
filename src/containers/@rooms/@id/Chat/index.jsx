import React, { Component } from 'react'
import { object, func, bool } from 'prop-types'
import { withStyles } from '@material-ui/core'
import roomShape from 'shapes/room'
import ChatBody from './ChatBody'
import Messages from './Messages'
import ChatForm from './ChatForm'
import wait from 'src/utils/wait'
import ChatHeader from './ChatHeader'
import { Loading } from 'components/index'

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 141px)'
  },
  titles: {
    paddingLeft: 13,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
}

class Chat extends Component {

  state = {
    page: 1,
    limit: 20,
    isScrollingBottom: false,
    isForceScrollingBottom: false,
    isLoading: true
  }

  async componentDidMount() {
    const { onMount } = this.props
    await this.load()
    this.forceScrollBottom()
    onMount(this.scrollBottom)
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
    this.setState({ isScrollingBottom: true })

  forceScrollBottom = () =>
    this.setState({ isForceScrollingBottom: true })

  disableScrolling = async () => {
    await wait(500)
    this.setState({ isScrollingBottom: false })
  }

  disableForceScrolling = () =>
    this.setState({ isForceScrollingBottom: false })

  join = () => {
    const { room, onJoin } = this.props
    onJoin(room)
  }

  render() {
    const { classes, room, isGuest, onLeave } = this.props
    const { isScrollingBottom, isForceScrollingBottom, isLoading } = this.state

    return (
      <div className={classes.root}>
        <ChatHeader
          room={room}
          isGuest={isGuest}
          onLeave={onLeave}
          onJoin={this.join}
        />
        <div className={classes.body}>
          <ChatBody
            isScrollingBottom={isScrollingBottom}
            isForceScrollingBottom={isForceScrollingBottom}
            onScrollBottom={this.disableScrolling}
            onScrollTop={this.loadMoreMessages}
            onForceScrollBottom={this.disableForceScrolling}
          >
            {isLoading
              ? <Loading className={classes.loading} />
              : <Messages messages={room.messages || []} />
            }
          </ChatBody>
          <ChatForm
            isGuest={isGuest}
            invite_token={room.invite_token}
            onJoin={this.join}
            onSubmit={this.sendMessage}
          />
        </div>
      </div>
    )
  }
}

Chat.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
  isGuest: bool,
  onLoad: func.isRequired,
  onSend: func.isRequired,
  onMount: func.isRequired,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
}
export default withStyles(styles)(Chat)
