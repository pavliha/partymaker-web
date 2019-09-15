import React, { Component } from 'react'
import { object, func, bool, shape, string } from 'prop-types'
import { IconButton, withStyles, Menu, MenuItem } from '@material-ui/core'
import MoreIcon from 'mdi-react/MoreVertIcon'
import roomShape from 'shapes/room'
import { withRouter } from 'react-router-dom'
import { LeaveRoomDialog } from 'components'

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

  moreButton: {},

  guests: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  join: {
    color: theme.palette.primary.main,
  },
})

class ChatMenu extends Component {

  state = {
    anchorEl: null,
  }

  open = (e) =>
    this.setState({ anchorEl: e.currentTarget })

  close = () =>
    this.setState({ anchorEl: null })

  openLeaveRoomDialog = () => {
    const { history, room } = this.props
    history.push(`/rooms/${room.id}/leave`)
    this.close()
  }

  closeLeaveRoomDialog = () => {
    const { history } = this.props
    history.goBack()
    this.close()
  }

  openGuestsDrawer = () => {
    const { history, room } = this.props
    history.push(`/rooms/${room.id}/guests`)
    this.close()
  }

  leaveRoom = async () => {
    const { history, onLeave } = this.props
    this.closeLeaveRoomDialog()
    onLeave()
    this.close()
    history.push(`/profile`)
  }

  joinRoom = async () => {
    const { room, onJoin } = this.props
    this.closeLeaveRoomDialog()
    onJoin(room)
    this.close()
  }

  render() {
    const { location, classes, room, isGuest } = this.props
    const { anchorEl } = this.state

    return (
      <div className={classes.root}>
        <IconButton className={classes.moreButton} onClick={this.open}>
          <MoreIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.close}
        >
          <MenuItem className={classes.guests} onClick={this.openGuestsDrawer}>Участники</MenuItem>
          {isGuest
            ? <MenuItem className={classes.join} onClick={this.joinRoom}>Присоедениться</MenuItem>
            : <MenuItem className={classes.danger} onClick={this.openLeaveRoomDialog}>Покинуть компанию</MenuItem>
          }

        </Menu>
        <LeaveRoomDialog
          isOpen={location.pathname === `/rooms/${room.id}/leave`}
          onCancel={this.closeLeaveRoomDialog}
          onConfirm={this.leaveRoom}
        />
      </div>
    )
  }
}

ChatMenu.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func, goBack: func }),
  location: shape({ pathname: string }),
  room: roomShape.isRequired,
  isGuest: bool,
  onLeave: func.isRequired,
  onJoin: func.isRequired,
}

export default withStyles(styles)(withRouter(ChatMenu))
