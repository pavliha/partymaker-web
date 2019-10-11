import React from 'react'
import { object, shape, string } from 'prop-types'
import { DefaultHeader, PlaceActions, PlaceLoader } from 'components'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  place: {
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
    }
  }
})

const PlaceScene = ({ match, classes }) =>
  <div className={classes.root}>
    <DefaultHeader back />
    <PlaceLoader
      className={classes.place}
      id={match.params.id}
      actions={<PlaceActions place_id={match.params.id} />}
    />
  </div>

PlaceScene.propTypes = {
  classes: object.isRequired,
  match: shape({ params: shape({ id: string }) }),
}

export default withStyles(styles)(PlaceScene)
