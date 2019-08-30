import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import DatetimeForm from './DatetimeForm'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: 72,
    overflow: 'hidden',
    display: 'flex',
    padding: '0px',
    color: theme.palette.primary.main,
  },
})

class DatetimeOverlay extends Component {
  render() {
    const { classes, onClose, onSubmit } = this.props

    return (
      <div className={classes.root}>
        <DatetimeForm onClose={onClose} onSubmit={onSubmit} />
      </div>
    )
  }
}

DatetimeOverlay.propTypes = {
  classes: object.isRequired,
  onClose: func.isRequired,
  onSubmit: func.isRequired,
}

export default withStyles(styles)(DatetimeOverlay)
