import React, { Component } from 'react'
import { object, func } from 'prop-types'
import roomShape from 'shapes/room'
import { Button, withStyles } from '@material-ui/core'
import PlaceTitle from './PlaceTitle'
import Time from './Time'
import { withRouter } from 'react-router-dom'
import { LeaveRoomDialog } from 'components'
import ChoosePlaceTitle from './ChoosePlaceTitle'

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

class Header extends Component {

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
    const { room, history, onLeave } = this.props
    this.closeLeaveRoomDialog()
    await onLeave(room.id)
    history.push('/rooms')
  }

  render() {
    const { classes, room } = this.props
    const { isLeaveRoomDialogOpen } = this.state

    return (
      <div className={classes.root}>
        {room?.place
          ? <PlaceTitle place={room.place} />
          : <ChoosePlaceTitle />
        }
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

Header.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
  onLeave: func.isRequired,
}

export default withStyles(styles)(withRouter(Header))
