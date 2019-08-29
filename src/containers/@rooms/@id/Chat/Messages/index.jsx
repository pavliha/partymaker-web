import React from 'react'
import { arrayOf, object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import messageShape from 'shapes/message'
import Message from './Message'
import UserCaption from './UserCaption'

const styles = {
  message: {
    width: '100%'
  }
}

let prev_id = null

const displayUserName = (message) => {
  const isNameVisible = message.user_id !== prev_id

  prev_id = message.user_id

  return isNameVisible ? message.user?.name : null
}

const Messages = ({ classes, messages }) =>
  messages.map(message => (
    <div className={classes.message} key={message.id}>
      <UserCaption isMine={message.isMine}>
        {Boolean(message.user_id) && displayUserName(message)}
      </UserCaption>
      <Message message={message} />
    </div>
  ))

Messages.propTypes = {
  classes: object.isRequired,
  messages: arrayOf(messageShape).isRequired,
}

export default withStyles(styles)(Messages)
