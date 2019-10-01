import React from 'react'
import { bool, func, object, oneOf, shape } from 'prop-types'
import { SwipeableDrawer as MuiSwipeableDrawer, Drawer as MuiDrawer, withStyles } from '@material-ui/core'
import roomShape from 'shapes/room'
import { GuestList, Invite, RoomTitle } from 'components'
import { actions, connect } from 'src/redux'

const styles = {
  root: {
    width: 370,
  },
}

const GuestsDrawer = ({ classes, room, anchor, isOpen, onClose, onOpen, redux: { kickGuest } }) => {

  const Drawer = onOpen ? MuiSwipeableDrawer : MuiDrawer

  return (
    <Drawer
      anchor={anchor}
      hysteresis={0}
      minFlingVelocity={0}
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen || undefined}
    >
      <div className={classes.root}>
        <RoomTitle room={room} action={<Invite invite_token={room.invite_token} />} />
        <GuestList guests={room.guests} onKick={kickGuest} />
      </div>
    </Drawer>
  )
}

GuestsDrawer.propTypes = {
  classes: object.isRequired,
  isOpen: bool.isRequired,
  room: roomShape.isRequired,
  onClose: func.isRequired,
  onOpen: func,
  anchor: oneOf(['left', 'right']),
  redux: shape({
    kickGuest: func.isRequired,
  })
}
GuestsDrawer.defaultProps = {
  anchor: 'right'
}

const redux = (state, { room }) => ({
  kickGuest: guest => actions.rooms.guests.kick(room.id, guest.id)
})

export default withStyles(styles)(connect(redux)(GuestsDrawer))
