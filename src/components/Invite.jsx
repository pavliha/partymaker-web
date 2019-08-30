import React, { Component } from 'react'
import { object, string } from 'prop-types'
import { IconButton, SvgIcon, withStyles } from '@material-ui/core'
import PersonAddIcon from 'mdi-react/PersonAddIcon'
import { InviteDialog } from 'components'

const styles = {
  root: {},
}

class Invite extends Component {

  state = {
    isDialogOpen: false
  }

  open = () =>
    this.setState({ isDialogOpen: true })

  close = () =>
    this.setState({ isDialogOpen: false })

  render() {
    const { classes, invite_token } = this.props
    const { isDialogOpen } = this.state

    return (
      <div className={classes.root}>
        <IconButton onClick={this.open}>
          <SvgIcon color="primary">
            <PersonAddIcon />
          </SvgIcon>
        </IconButton>
        <InviteDialog
          invite_token={invite_token}
          isOpen={isDialogOpen}
          onClose={this.close} />
      </div>
    )
  }
}

Invite.propTypes = {
  classes: object.isRequired,
  invite_token: string.isRequired
}

export default withStyles(styles)(Invite)
