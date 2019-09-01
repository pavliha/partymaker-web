import React from 'react'
import { func, object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { DatetimeForm } from 'components'

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

const DatetimeOverlay = ({ classes, onClose, onSubmit }) =>
  <div className={classes.root}>
    <DatetimeForm onClose={onClose} onSubmit={onSubmit} />
  </div>

DatetimeOverlay.propTypes = {
  classes: object.isRequired,
  onClose: func.isRequired,
  onSubmit: func.isRequired,
}

export default withStyles(styles)(DatetimeOverlay)
