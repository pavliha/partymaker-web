import React from 'react'
import { object } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'

const styles = {
  root: {},
  primary: {
    marginRight: 20,
  }
}

const PlaceActions = ({ classes }) =>
  <div className={classes.root}>
    <Button
      className={classes.primary}
      color="primary"
      variant="contained"
    >
      Заказать
    </Button>
  </div>

PlaceActions.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(PlaceActions)
