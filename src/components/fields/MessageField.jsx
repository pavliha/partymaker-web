/* eslint-disable no-param-reassign */
import { withStyles } from '@material-ui/core'
import { string, func, object } from 'prop-types'
import React, { Component } from 'react'
import { MessageInput } from 'components'

const styles = {
  root: {
    flexGrow: 1,
    maxHeight: 200,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
}

class MessageField extends Component {

  listenForEnter = async (e) => {
    const { onSend } = this.props
    const code = (e.keyCode ? e.keyCode : e.which)

    if (code === 13 && !e.shiftKey) {
      onSend(e)
    }
  }

  addEmoji = (emojiPic) => {
    const { name, value, onChange } = this.props

    onChange(name, value + emojiPic)
  }

  change = (e) => {
    const { name, onChange } = this.props
    onChange(name, e.target.value)
  }

  blur = (e) => {
    e.preventDefault()
  }

  render() {
    const { classes, inputRef, name, value, placeholder, onPaste } = this.props

    return (
      <div className={classes.root}>
        <MessageInput
          inputRef={inputRef}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classes.root}
          onKeyPress={this.listenForEnter}
          onChange={this.change}
          onBlur={this.blur}
          onPaste={onPaste}
        />
      </div>
    )
  }
}

MessageField.propTypes = {
  inputRef: func,
  classes: object.isRequired,
  placeholder: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  onSend: func.isRequired,
  onChange: func.isRequired,
  onPaste: func,
}

export default withStyles(styles)(MessageField)
