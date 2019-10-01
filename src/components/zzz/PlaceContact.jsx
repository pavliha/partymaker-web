import React from 'react'
import { object, string } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.8,
  },
  icon: {
    marginRight: 15,
    marginLeft: 5,
  },
  label: {}
}

const PlaceContact = ({ classes, icon: Icon, label }) =>
  <div className={classes.root}>
    <Icon className={classes.icon} />
    <div className={classes.label}>{label}</div>
  </div>

PlaceContact.propTypes = {
  classes: object.isRequired,
  icon: object,
  label: string,
}

export default withStyles(styles)(PlaceContact)
