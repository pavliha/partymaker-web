import React, { Component } from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import messageShape from 'shapes/message'
import classNames from 'classnames'
import isPicture from 'utils/isPicture'
import { BACKEND_URL } from 'config/app'

import {
  UserAvatar,
  MessageBubble,
  TextMessage,
  PictureMessage,
  FileMessage,
  NotificationMessage,
  DateMessage
} from 'components'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '5px 12px'
  },
  isMine: {
    flexDirection: 'row-reverse',
  },
  center: {
    justifyContent: 'center',
  }
}

class Message extends Component {

  getUser() {
    const { message } = this.props

    const partymakerUser = {
      id: 1,
      name: 'Partymaker',
      email: 'bot@partymaker.zp.ua',
      phone: '+380555555555',
      avatar_url: `${BACKEND_URL}/images/logo_big.png`,
    }

    return message.user_id === 1 ? partymakerUser : message.user
  }

  render() {
    const { classes, message } = this.props

    return (
      <div className={classNames({
        [classes.root]: true,
        [classes.isMine]: message.isMine,
        [classes.center]: !message.user_id
      })}>
        {this.getUser() && !message.isMine && <UserAvatar user={this.getUser()} />}
        <MessageBubble isMine={message.isMine}>
          {(() => {
            if (!message.user_id) {
              return <NotificationMessage message={message} />
            }

            if (message.date) {
              return <DateMessage message={message} />
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
