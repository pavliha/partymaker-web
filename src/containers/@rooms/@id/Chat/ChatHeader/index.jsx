import React, { Component } from 'react'
import { object, func } from 'prop-types'
import roomShape from 'shapes/room'
import { Button, withStyles } from '@material-ui/core'
import Time from './Time'
import { LeaveRoomDialog, PlaceTitle } from 'components'

const styles = theme => ({
  root: {
    display: 'flex',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 20px',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)'
  },
  aside: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    color: theme.palette.error.main,
  }
})

class ChatHeader extends Component {

  state = {
    isLeaveRoomDialogOpen: false
  }

  openLeaveRoomDialog = async () => {
    this.setState({ isLeaveRoomDialogOpen: true })
  }

  closeLeaveRoomDialog = () => {
    this.setState({ isLeaveRoomDialogOpen: false })
  }

  leaveRoom = async () => {
    const { room, onLeave } = this.props
    this.closeLeaveRoomDialog()
    await onLeave(room)
  }

  render() {
    const { classes, room } = this.props
    const { isLeaveRoomDialogOpen } = this.state

    return (
      <div className={classes.root}>
        <PlaceTitle place={room.place} />
        <div className={classes.aside}>
          <Time>{room?.time}</Time>
          <Button
            className={classes.button}
            color="inherit"
            variant="outlined"
            onClick={this.openLeaveRoomDialog}
          >
            Покинуть компанию
          </Button>
        </div>
        <LeaveRoomDialog
          isOpen={isLeaveRoomDialogOpen}
          onCancel={this.closeLeaveRoomDialog}
          onConfirm={this.leaveRoom}
        />
      </div>
    )
  }
}

ChatHeader.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
  onLeave: func.isRequired,
}

export default withStyles(styles)(ChatHeader)
