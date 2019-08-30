import React, { Component } from 'react'
import { object, func, bool } from 'prop-types'
import roomShape from 'shapes/room'
import { Button, withStyles } from '@material-ui/core'
import { LeaveRoomDialog, PlaceTitle, DateTimeStatus } from 'components'

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
  joinButton: {
    color: theme.palette.primary.main,
  },
  leaveButton: {
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

  joinRoom = () => {
    const { room, onJoin } = this.props
    onJoin(room)
  }

  render() {
    const { classes, room, isGuest } = this.props
    const { isLeaveRoomDialogOpen } = this.state

    return (
      <div className={classes.root}>
        <PlaceTitle room_id={room.id} place={room.place} />
        <div className={classes.aside}>
          <DateTimeStatus date={room.date} time={room.time} />
          {isGuest
            ? (
              <Button
                className={classes.joinButton}
                color="inherit"
                variant="outlined"
                onClick={this.joinRoom}
              >
                Присоеденится
              </Button>
            )
            : (
              <Button
                className={classes.leaveButton}
                color="inherit"
                variant="outlined"
                onClick={this.openLeaveRoomDialog}
              >
                Покинуть компанию
              </Button>
            )
          }
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
  isGuest: bool,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
}

export default withStyles(styles)(ChatHeader)
