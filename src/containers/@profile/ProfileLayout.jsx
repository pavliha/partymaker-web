import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { AppBottomNavigation, LeftNavigation } from 'components'
import { Switch, Route } from 'react-router-dom'
import ProfileScene from './ProfileScene'
import SettingsScene from './@settings/SettingsScene'

const styles = theme => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  routes: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 315,
    },
    flex: 1,
  },
  nav: {
    position: 'fixed',
  },
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  }
})

const ProfileLayout = ({ classes }) =>
  <div className={classes.root}>
    <LeftNavigation className={classes.nav} />
    <div className={classes.routes}>
      <Switch>
        <Route exact path="/profile" component={ProfileScene} />
        <Route exact path="/profile/settings" component={SettingsScene} />
      </Switch>
    </div>
    <AppBottomNavigation className={classes.bottomNavigation} />
  </div>

ProfileLayout.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(ProfileLayout)
