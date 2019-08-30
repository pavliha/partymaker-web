import React from 'react'
import { object, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {
    cursor: 'pointer',
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.12)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}

const Picture = ({ classes, className, src, onClick }) =>
  <div
    className={classNames(classes.root, className)}
    style={{ backgroundImage: src && `url(${src})` }}
    onClick={onClick}
  />

Picture.propTypes = {
  classes: object.isRequired,
  className: string,
  src: string,
  onClick: func,
}

Picture.defaultProps = {
  onClick: () => {}
}

export default withStyles(styles)(Picture)
