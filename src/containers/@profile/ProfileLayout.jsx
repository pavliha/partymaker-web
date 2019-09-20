import React from 'react'
import { object, shape } from 'prop-types'
import userShape from 'shapes/user'
import { withStyles } from '@material-ui/core'
import { AppBottomNavigation, ProfileHeader } from 'components'
import { Switch, Route } from 'react-router-dom'
import ProfileScene from './ProfileScene'
import SettingsScene from './@settings/SettingsScene'
import { select, connect } from 'src/redux'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  routes: {
    flex: 1,
    overflow: 'auto',
  }
}

const ProfileLayout = ({ classes, redux: { user }, }) =>
  <div className={classes.root}>
    <ProfileHeader user={user} />
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
  redux: shape({ user: userShape, })
}

const redux = (state) => ({
  user: select.auth.user(state),
})

export default withStyles(styles)(connect(redux)(ProfileLayout))
