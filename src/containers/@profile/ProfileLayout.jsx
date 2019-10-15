import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { AppBottomNavigation, LeftNavigation } from 'components'
import { Switch, Route } from 'react-router-dom'
import ProfileScene from './ProfileScene'
import SettingsScene from './@settings/SettingsScene'

const styles = {

  root: {
    display: 'flex',
    height: '100%',
  },
  routes: {
    marginLeft: 315,
    flex: 1,
  },
  nav: {
    position: 'fixed',
  }
}

const ProfileLayout = ({ classes }) =>
  <div className={classes.root}>
    <LeftNavigation className={classes.nav} />
    <div className={classes.routes}>
      <Switch>
        <Route exact path="/profile" component={ProfileScene} />
        <Route exact path="/profile/settings" component={SettingsScene} />
      </Switch>
    </div>
    <AppBottomNavigation />
  </div>

ProfileLayout.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(ProfileLayout)
