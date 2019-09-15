import React, { Component } from 'react'
import { object, string, shape, number, func } from 'prop-types'
import { IconButton, SvgIcon, withStyles } from '@material-ui/core'
import { Route, withRouter } from 'react-router-dom'
import PersonAddIcon from 'mdi-react/PersonAddIcon'
import { InviteDialog } from 'components'

const styles = {
  root: {},
}

class Invite extends Component {

  open = () => {
    const { room, history } = this.props
    history.push(`/rooms/${room.id}/invite`)
  }

  render() {
    const { classes, room } = this.props

    return (
      <div className={classes.root}>
        <IconButton onClick={this.open}>
          <SvgIcon color="primary">
            <PersonAddIcon />
          </SvgIcon>
        </IconButton>
        <Route
          path="/rooms/:id/invite"
          render={({ history }) =>
            <InviteDialog
              isOpen
              invite_token={room.invite_token}
              onClose={history.goBack} />
          }
        />
      </div>
    )
  }
}

Invite.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  room: shape({
    id: number,
    invite_token: string.isRequired,
  })
}

export default withStyles(styles)(withRouter(Invite))
