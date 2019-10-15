import React from 'react'
import { object, shape, string } from 'prop-types'
import { PlaceActions, PlaceLoader, LeftNavigation, AppBottomNavigation } from 'components'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 850,
    height: '100%',
    marginBottom: 60,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      marginLeft: 300,
      width: 'calc(100% - 330px)',
    },
  },

  leftNavigation: {
    position: 'fixed',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },

  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  }

})

const PlaceScene = ({ match, classes }) =>
  <div className={classes.root}>
    <LeftNavigation className={classes.leftNavigation} />
    <PlaceLoader
      className={classes.container}
      id={match.params.id}
      actions={<PlaceActions place_id={match.params.id} />}
    />
    <AppBottomNavigation className={classes.bottomNavigation} />
  </div>

PlaceScene.propTypes = {
  classes: object.isRequired,
  match: shape({ params: shape({ id: string }) }),
}

export default withStyles(styles)(PlaceScene)
