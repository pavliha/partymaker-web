import React, { Component } from 'react'
import { object, func } from 'prop-types'
import userShape from 'shapes/user'
import { ListItem, withStyles } from '@material-ui/core'
import { UserAvatar } from 'components'
import KickGuestDialog from 'components/KickGuestDialog'
import GuestItemText from 'components/GuestItemText'

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

  openKickGuestDialog = () => {
    this.setState({ isKickGuestDialogOpen: true })
  }

  closeKickGuestDialog = () => {
    this.setState({ isKickGuestDialogOpen: false })
  }

  kickGuest = () => {
    const { guest, onKick } = this.props
    this.closeKickGuestDialog()
    onKick(guest)
  }

  render() {
    const { classes, guest } = this.props
    const { isKickGuestDialogOpen } = this.state
    return (
      <ListItem className={classes.root}>
        <UserAvatar is_online={guest.is_online} user={guest} />
        <GuestItemText
          guest={guest}
          onClose={this.openKickGuestDialog}
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
  guest: userShape.isRequired,
  onKick: func.isRequired,
}

export default withStyles(styles)(Guest)
