import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { IconButton, withStyles, Menu, MenuItem, Button } from '@material-ui/core'
import MoreIcon from 'mdi-react/MoreVertIcon'
import roomShape from 'shapes/room'
import { GuestsDrawer, LeaveRoomDialog } from 'components'

const styles = theme => ({
  root: {},
  danger: {
    color: theme.palette.error.main
  },

  leaveButton: {
    color: theme.palette.error.main,
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block'
    }
  },
  moreButton: {
    display: 'block',
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  guests: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

class ChatMenu extends Component {

  state = {
    anchorEl: null,
    isLeaveRoomDialogOpen: false,
    isGuestsDrawerOpen: false,
  }

  open = (e) =>
    this.setState({ anchorEl: e.currentTarget })

  close = () =>
    this.setState({ anchorEl: null })

  openLeaveRoomDialog = async () =>
    this.setState({ isLeaveRoomDialogOpen: true })

  closeLeaveRoomDialog = () =>
    this.setState({ isLeaveRoomDialogOpen: false })

  openGuestsDrawer = () =>
    this.setState({ isGuestsDrawerOpen: true })

  closeGuestsDrawer = () =>
    this.setState({ isGuestsDrawerOpen: false })

  leaveRoom = async () => {
    const { onLeave } = this.props
    this.closeLeaveRoomDialog()
    onLeave()
  }

  render() {
    const { classes, room } = this.props
    const { anchorEl } = this.state
    const { isLeaveRoomDialogOpen, isGuestsDrawerOpen } = this.state

    return (
      <div className={classes.root}>
        <Button
          className={classes.leaveButton}
          color="inherit"
          variant="outlined"
          onClick={this.openLeaveRoomDialog}
        >
          Покинуть компанию
        </Button>
        <IconButton className={classes.moreButton} onClick={this.open}>
          <MoreIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.close}
        >
          <MenuItem className={classes.guests} onClick={this.openGuestsDrawer}>
            Участники
          </MenuItem>
          <MenuItem className={classes.danger} onClick={this.openLeaveRoomDialog}>
            Покинуть компанию
          </MenuItem>
        </Menu>
        <LeaveRoomDialog
          isOpen={isLeaveRoomDialogOpen}
          onCancel={this.closeLeaveRoomDialog}
          onConfirm={this.leaveRoom}
        />
        <GuestsDrawer
          room={room}
          isOpen={isGuestsDrawerOpen}
          onClose={this.closeGuestsDrawer}
        />
      </div>
    )
  }
}

ChatMenu.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
  onLeave: func.isRequired,
}

export default withStyles(styles)(ChatMenu)