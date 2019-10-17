import React, { Component, lazy, Suspense } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles, Typography, Button } from '@material-ui/core'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import { Loading, SocialLoginActions, NavigationContainer, BackButton } from 'components'
import Storage from 'services/Storage'

const LoginScene = lazy(() => import('./@login/LoginScene'))
const LogoutScene = lazy(() => import('./@logout/LogoutScene'))
const RegisterScene = lazy(() => import('./@register/RegisterScene'))
const ActivateScene = lazy(() => import('./@activate/ActivateScene'))
const PasswordLayout = lazy(() => import('./@password/PasswordLayout'))

const styles = () => ({

  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    height: 80,
    boxSizing: 'borderBox',
    display: 'flex',
    padding: '0 25px',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 15,
  },
  divider: {
    marginTop: 30,
    marginBottom: 30,
    fontFamily: 'Google Sans',
    color: 'rgba(0,0,0,0.8)',
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
      <NavigationContainer>
        <div className={classes.root}>
          <header className={classes.header}>
            <BackButton />
            <div>
              <Link to="/auth/login"><Button>ВОЙТИ</Button></Link>
              <Link to="/auth/register"><Button>РЕГИСТРАЦИЯ</Button></Link>
            </div>
          </header>
          <div className={classes.container}>
            <div>
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
      </NavigationContainer>
    )
  }
}

AuthLayout.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func })
}

export default withStyles(styles)(AuthLayout)
