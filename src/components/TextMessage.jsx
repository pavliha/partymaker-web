import React, { Component } from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import messageShape from 'shapes/message'
import emojiRegex from 'emoji-regex'
import { MessageStatus } from 'components'
import replace from 'string-replace-to-array'
import Linkify from 'react-linkify'
import classNames from 'classnames'

const styles = () => ({
  root: {
    padding: '8px 10px',
    display: 'flex',
    borderRadius: 15,
    alignItems: 'flex-end',
    boxShadow: '2px 2px 3px -1px rgba(156, 169, 189, 0.3)',
    background: 'white'
  },

  multiline: {
    flexDirection: 'column'
  },
  text: {
    whiteSpace: 'pre-wrap',
    fontSize: 15,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    MsWordBreak: 'break-all',
    wordBreak: 'break-word',
    lineHeight: 1.5,
    '& a': {
      color: '#006eb3',
    }
  },
  emoji: {
    fontSize: 17,
    lineHeight: 1,
  }
})

class TextMessage extends Component {

  textRef = React.createRef()

  state = {
    isMultiline: false
  }

  componentDidMount() {
    const { textRef: { current } } = this
    if (current && current.offsetHeight > 30) {
      this.setState({ isMultiline: true })
    }
  }

  formatEmoji = (text) => {
    const { classes } = this.props
    const format = (emoji, offset) => <span key={offset} className={classes.emoji}>{emoji}</span>

    return replace(text, emojiRegex(), format)
  }

  render() {
    const { classes, message } = this.props
    const { isMultiline } = this.state

    if (!message.text) return null

    return (
      <div className={classNames({
        [classes.root]: true,
        [classes.multiline]: isMultiline
      })}>
        <Typography ref={this.textRef} className={classes.text}>
          <Linkify>{this.formatEmoji(message.text.trim())}</Linkify>
        </Typography> {' '}
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
