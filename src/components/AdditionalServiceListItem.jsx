import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { additionalServiceShape } from 'shapes'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Google Sans,sans-serif',
    margin: '15px 0'
  },

  container: {
    flex: 1,
  },

  title: {
    fontFamily: 'Google Sans,sans-serif',
    fontSize: 16,
  },

  cost: {
    fontSize: 18,
  },

  description: {
    fontSize: 14,
  }
}

const AdditionalServiceListItem = ({ classes, additional_service }) =>
  <div className={classes.root}>
    <div className={classes.container}>
      <Typography className={classes.title}>
        {additional_service.title}
      </Typography>
      <Typography color="textSecondary" className={classes.description}>
        {additional_service.description}
      </Typography>
    </div>
    {additional_service.price && (
      <Typography className={classes.cost}>
        {additional_service.price} грн
      </Typography>
    )}
  </div>

AdditionalServiceListItem.propTypes = {
  classes: object.isRequired,
  additional_service: additionalServiceShape,
}

export default withStyles(styles)(AdditionalServiceListItem)
