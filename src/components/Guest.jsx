import React, { Component } from 'react'
import { object, func, bool } from 'prop-types'
import userShape from 'shapes/user'
import { ListItem, withStyles } from '@material-ui/core'
import { UserAvatar, KickGuestDialog, GuestItemText } from 'components'

const styles = {
  root: {
    '&:hover': {
      background: 'rgba(0,0,0,0.08)'
    },
    '&:hover aside': {
      display: 'flex'
    },
    '&:hover label': {
      display: 'none'
    }
  },
}

class Guest extends Component {

  state = {
    isKickGuestDialogOpen: false,
  }

  openKickGuestDialog = () =>
    this.setState({ isKickGuestDialogOpen: true })

  closeKickGuestDialog = () =>
    this.setState({ isKickGuestDialogOpen: false })

  kickGuest = () => {
    const { guest, onKick } = this.props
    this.closeKickGuestDialog()
    onKick(guest)
  }

  render() {
    const { classes, guest, hideOnline, onKick } = this.props
    const { isKickGuestDialogOpen } = this.state
    return (
      <ListItem className={classes.root}>
        <UserAvatar is_online={guest.is_online} user={guest} />
        <GuestItemText
          guest={guest}
          hideOnline={hideOnline}
          onKick={onKick && this.openKickGuestDialog}
        />
        <KickGuestDialog
          guest={guest}
          isOpen={isKickGuestDialogOpen}
          onCancel={this.closeKickGuestDialog}
          onConfirm={this.kickGuest}
        />
      </ListItem>
    )
  }
}

Guest.propTypes = {
  classes: object.isRequired,
  hideOnline: bool,
  guest: userShape.isRequired,
  onKick: func,
}

export default withStyles(styles)(Guest)
