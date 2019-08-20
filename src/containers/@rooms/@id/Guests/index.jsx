import React from 'react'
import { object, arrayOf, func } from 'prop-types'
import userShape from 'shapes/user'
import { withStyles, List } from '@material-ui/core'
import Guest from './Guest'

const styles = {
  root: {
    overflow: 'auto',
    flexGrow: 1,
  },
}

const Guests = ({ classes, guests, onKick }) =>
  <List className={classes.root}>
    {guests.map(guest => (
      <Guest
        key={guest.id}
        guest={guest}
        onKick={onKick}
      />
    ))}
  </List>

Guests.propTypes = {
  classes: object.isRequired,
  guests: arrayOf(userShape).isRequired,
  onKick: func.isRequired,
}

export default withStyles(styles)(Guests)
