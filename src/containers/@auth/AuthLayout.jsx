import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Header, SocialLoginActions } from 'components'
import sparks from '../IndexScene/nightZP.png'
import LoginScene from './@login/LoginScene'
import LogoutScene from './@logout/LogoutScene'
import RegisterScene from './@register/RegisterScene'
import ActivateScene from './@activate/ActivateScene'
import PasswordLayout from './@password/PasswordLayout'
import Storage from 'services/Storage'
import { Typography } from '@material-ui/core'

const styles = () => ({
  root: {
    height: '100vh',
    background: `url(${sparks})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scene: {
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  divider: {
    color: 'white',
  },
  headerRoot: {
    position: 'absolute',
    background: 'transparent',
    boxShadow: 'none',
  },

  dividerChild: {
    padding: '10px 0',
    display: 'flex',
  },

  takeAllSpace: {
    flex: 1,
    padding: '0 10px',
    alignSelf: 'center'
  },
})

class AuthLayout extends Component {

  loginWithSocial = () => {
    const { history } = this.props
    const previous_user_location = Storage.get('previous_user_location')
    history.push(previous_user_location || '/rooms')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Header classes={{ root: classes.headerRoot }} />
        <div className={classes.container}>
          <div className={classes.scene}>
            <div>
              <Switch>
                <Route exact path="/auth/register" component={RegisterScene} />
                <Route exact path="/auth/login" component={LoginScene} />
                <Route exact path="/auth/activate/:hash" component={ActivateScene} />
                <Route exact path="/auth/logout" component={LogoutScene} />
                <Route path="/auth/password" component={PasswordLayout} />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            <div className={classes.divider}>
              <div className={classes.dividerChild}>
                <div className={classes.takeAllSpace}>
                  <hr />
                </div>
                <Typography variant="subtitle1" color="inherit">ИЛИ</Typography>
                <div className={classes.takeAllSpace}>
                  <hr />
                </div>
              </div>
            </div>
            <SocialLoginActions onLogin={this.loginWithSocial} />
          </div>
        </div>
      </div>
    )
  }
}

AuthLayout.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func })
}

export default withStyles(styles)(AuthLayout)
