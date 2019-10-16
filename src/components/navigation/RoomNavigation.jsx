import React from 'react'
import { node, object, string } from 'prop-types'
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
  container: {
    flex: 1,
  },
})

const RoomNavigation = ({ classes, className, room, action }) =>
  <div className={classNames(classes.root, className)}>
    <BackButton />
    <div className={classes.container}>
      <RoomTitle room={room} />
    </div>
    {action}
  </div>

RoomNavigation.propTypes = {
  classes: object.isRequired,
  className: string,
  room: roomShape.isRequired,
  action: node,
}

export default withStyles(styles)(withRouter(RoomNavigation))
