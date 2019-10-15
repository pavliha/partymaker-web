import React, { Component, lazy, Suspense } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Loading, SocialLoginActions } from 'components'
import sparks from '../IndexScene/nightZP.png'
import Storage from 'services/Storage'

const LoginScene = lazy(() => import('./@login/LoginScene'))
const LogoutScene = lazy(() => import('./@logout/LogoutScene'))
const RegisterScene = lazy(() => import('./@register/RegisterScene'))
const ActivateScene = lazy(() => import('./@activate/ActivateScene'))
const PasswordLayout = lazy(() => import('./@password/PasswordLayout'))

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
    padding: 15,
  },
  divider: {
    color: 'white',
  },
  header: {
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
    history.push(previous_user_location || '/profile')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root} id="AuthLayout">
        <div className={classes.container}>
          <div className={classes.scene}>
            <div>
              <Suspense fallback={<Loading center />}>
                <Switch>
                  <Route exact path="/auth/register" component={RegisterScene} />
                  <Route exact path="/auth/login" component={LoginScene} />
                  <Route exact path="/auth/activate/:hash" component={ActivateScene} />
                  <Route exact path="/auth/logout" component={LogoutScene} />
                  <Route path="/auth/password" component={PasswordLayout} />
                  <Redirect to="/auth/login" />
                </Switch>
              </Suspense>
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
            <Suspense fallback={<Loading center />}>
              <SocialLoginActions onLogin={this.loginWithSocial} />
            </Suspense>
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
