import React from 'react'
import { func, object, string } from 'prop-types'
import { Input, withStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: 15,
    maxHeight: 200,
    minHeight: 60,
    [theme.breakpoints.up('sm')]: {
      minHeight: 72,
    }
  },
  inputMultiline: {
    padding: 0,
  },
})

const MessageInput = ({ classes, inputRef, placeholder, name, value, onChange, onPaste, onKeyPress, }) =>
  <Input
    ref={inputRef}
    placeholder={placeholder}
    classes={classes}
    name={name}
    value={value}
    disableUnderline
    autoComplete="off"
    fullWidth
    multiline
    onKeyPress={onKeyPress}
    onChange={onChange}
    onPaste={onPaste}
  />

MessageInput.propTypes = {
  inputRef: func,
  classes: object.isRequired,
  placeholder: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  onPaste: func,
  onKeyPress: func,
}

export default withStyles(styles)(MessageInput)
