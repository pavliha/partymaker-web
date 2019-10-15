import React from 'react'
import { object, string } from 'prop-types'
import roomShape from 'shapes/room'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import { RoomTitle, BackButton } from 'components'
import classNames from 'classnames'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 5px',
  },
})

const RoomNavigation = ({ classes, className, room }) =>
  <div className={classNames(classes.root, className)}>
    <BackButton />
    <RoomTitle room={room} />
  </div>

RoomNavigation.propTypes = {
  classes: object.isRequired,
  className: string,
  room: roomShape.isRequired,
}

export default withStyles(styles)(withRouter(RoomNavigation))
