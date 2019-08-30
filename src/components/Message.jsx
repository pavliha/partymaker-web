import React, { Component } from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import messageShape from 'shapes/message'
import classNames from 'classnames'
import { UserAvatar, MessageBubble, TextMessage, PictureMessage, FileMessage, NotificationMessage } from 'components'
import isPicture from 'utils/isPicture'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '5px 15px'
  },
  isMine: {
    flexDirection: 'row-reverse',
  },
  center: {
    justifyContent: 'center',
  }
}

class Message extends Component {

  render() {
    const { classes, message } = this.props

    return (
      <div className={classNames({
        [classes.root]: true,
        [classes.isMine]: message.isMine,
        [classes.center]: !message.user_id
      })}>
        {message.user && !message.isMine && <UserAvatar user={message.user} />}
        <MessageBubble isMine={message.isMine}>
          {(() => {
            if (!message.user_id) {
              return <NotificationMessage message={message} />
            }

            if (isPicture(message.asset?.url)) {
              return <PictureMessage message={message} />
            }

            if (message.asset_id) {
              return <FileMessage message={message} />
            }

            return <TextMessage message={message} />
          })()}

        </MessageBubble>
      </div>
    )
  }
}

Message.propTypes = {
  classes: object.isRequired,
  message: messageShape.isRequired,
}

export default withStyles(styles)(Message)
