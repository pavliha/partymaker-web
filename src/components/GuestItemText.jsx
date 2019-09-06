import React, { Component } from 'react'
import { object, func, shape, bool } from 'prop-types'
import userShape from 'shapes/user'
import { Typography, withStyles } from '@material-ui/core'
import { CloseButton } from 'components'
import moment from 'moment'
import { select, connect } from 'src/redux'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0 0 15px',
    flexGrow: 1,
    alignItems: 'center',
    minHeight: 48,
  },
  actions: {
    display: 'none'
  },
}

class GuestItemText extends Component {

  lastSeen = (guest) => {
    if (guest?.is_online) return 'Онлайн'
    if (guest?.last_seen) {
      const lastSeen = moment(guest?.last_seen, 'YYYY-MM-DD HH:mm:ss').fromNow()

      return `Был(а) в сети ${lastSeen}`
    }

    return 'Нет в сети'
  }

  render() {
    const { classes, guest, hideOnline, onKick, redux: { user } } = this.props
    return (
      <div className={classes.root}>
        <div>
          <Typography variant="body1">{guest.name}</Typography>
          {!hideOnline && (
            <Typography color="textSecondary">
              {this.lastSeen(guest)}
            </Typography>
          )}
        </div>

        {onKick && user && (guest.id !== user.id) && (
          <aside className={classes.actions}>
            <CloseButton onClick={onKick} />
          </aside>
        )}
      </div>
    )
  }
}

GuestItemText.propTypes = {
  classes: object.isRequired,
  guest: userShape.isRequired,
  onKick: func,
  hideOnline: bool,
  redux: shape({ user: userShape, })
}
const redux = (state) => ({
  user: select.auth.user(state)
})

export default withStyles(styles)(connect(redux)(GuestItemText))
