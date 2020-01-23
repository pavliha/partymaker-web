import React from 'react'
import { object, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

const styles = {
  root: {},
  primary: {
    marginRight: 10,
  },
}

const PlaceActions = ({ classes, phone, website_url }) =>
  <div className={classes.root}>
    {phone && (
      <a href={`tel:${phone}`}>
        <Button
          aria-label="call via phone"
          className={classes.primary}
          color="primary"
          variant="contained"
        >
          Позвонить
        </Button>
      </a>
    )}
    {website_url && (
      <a href={website_url}>
        <Button>
          Открыть веб-сайт
        </Button>
      </a>
    )}
  </div>

PlaceActions.propTypes = {
  classes: object.isRequired,
  phone: string,
  website_url: string,
}

export default withStyles(styles)(PlaceActions)
