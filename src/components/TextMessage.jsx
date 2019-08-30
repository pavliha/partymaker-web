import React, { Component } from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import messageShape from 'shapes/message'
import emojiRegex from 'emoji-regex'
import { MessageStatus } from 'components'
import replace from 'string-replace-to-array'

const styles = () => ({
  root: {
    padding: '9px 15px',
    display: 'flex',
    borderRadius: 15,
    alignItems: 'flex-end',
    boxShadow: '2px 2px 3px -1px rgba(156, 169, 189, 0.3)',
    background: 'white'
  },
  text: {
    fontSize: 15,
    lineHeight: 1.5,
  },
  emoji: {
    fontSize: 17,
    lineHeight: 1,
  }
})

class TextMessage extends Component {

  formatEmoji = (text) => {
    const { classes } = this.props
    const format = (emoji, offset) => <span key={offset} className={classes.emoji}>{emoji}</span>

    return replace(text, emojiRegex(), format)
  }

  render() {
    const { classes, message } = this.props

    if (!message.text) return null

    return (
      <div className={classes.root}>
        <Typography className={classes.text}>{this.formatEmoji(message.text)}</Typography> {' '}
        <MessageStatus message={message} />
      </div>
    )
  }
}

TextMessage.propTypes = {
  classes: object.isRequired,
  message: messageShape.isRequired
}

export default withStyles(styles)(TextMessage)
