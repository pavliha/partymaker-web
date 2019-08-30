import React from 'react'
import { object, func, string } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import CloseIcon from 'mdi-react/CloseIcon'
import classNames from 'classnames'

const styles = {
  root: {
    marginRight: 5,
  },
}

const CloseButton = ({ classes, color, onClick, className }) =>
  <div className={classNames(classes.root, className)}>
    <IconButton color={color} onClick={onClick}>
      <CloseIcon />
    </IconButton>
  </div>

CloseButton.propTypes = {
  classes: object.isRequired,
  className: string,
  onClick: func.isRequired,
  color: string,
}

CloseButton.defaultProps = {
  color: 'primary'
}

export default withStyles(styles)(CloseButton)
