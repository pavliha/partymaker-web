import React, { Component } from 'react'
import { object, arrayOf } from 'prop-types'
import userShape from 'shapes/user'
import { withStyles, List } from '@material-ui/core'
import Guest from './Guest'

const styles = {
  root: {
    overflow: 'auto',
    flexGrow: 1,
  },
}

class Guests extends Component {
  render() {
    const { classes, guests, onKick } = this.props

    return (
      <List className={classes.root}>
        {guests.map(guest => (
          <Guest
            key={guest.id}
            guest={guest}
            onKick={onKick}
          />
        ))}
      </List>
    )
  }
}

Guests.propTypes = {
  classes: object.isRequired,
  guests: arrayOf(userShape).isRequired,
}

export default withStyles(styles)(Guests)
