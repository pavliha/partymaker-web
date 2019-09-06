import React from 'react'
import { object, arrayOf, func, bool } from 'prop-types'
import userShape from 'shapes/user'
import { withStyles, List } from '@material-ui/core'
import { Guest } from 'components'

const styles = {
  root: {
    overflow: 'auto',
    flexGrow: 1,
  },
}

const GuestList = ({ classes, hideOnline, guests, onKick }) =>
  <List className={classes.root}>
    {guests.map(guest => (
      <Guest
        hideOnline={hideOnline}
        key={guest.id}
        guest={guest}
        onKick={onKick}
      />
    ))}
  </List>

GuestList.propTypes = {
  classes: object.isRequired,
  hideOnline: bool,
  guests: arrayOf(userShape).isRequired,
  onKick: func,
}

export default withStyles(styles)(GuestList)
