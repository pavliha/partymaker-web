/* eslint-disable max-len */
import React, { Component } from 'react'
import { object, shape, func, string } from 'prop-types'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button, withStyles } from '@material-ui/core'
import FacebookBoxIcon from 'mdi-react/FacebookBoxIcon'
import GoogleIcon from 'mdi-react/GoogleIcon'
import { actions, connect } from 'src/redux'
import classNames from 'classnames'

const styles = {
  root: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '40%',
    borderRadius: 25,
    alignItems: 'center',
    borderColor: 'inherit',
    padding: 7,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  },
  text: {
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 550,
    fontSize: 15,
  },
}

class SocialLoginActions extends Component {
  loginFacebook = async FBuser => {
    const { redux, onLogin } = this.props

    const userDetails = {
      name: FBuser.name,
      email: FBuser.email,
      provider_token: FBuser.accessToken,
      provider: 'facebook',
      provider_id: FBuser.id,
      avatar_url: FBuser.picture.data.url,
    }

    await redux.loginWithFacebook(userDetails)
    onLogin(userDetails)
  }

  loginGoogle = async response => {
    const { redux, onLogin } = this.props

    if (response.error) return

    const userDetails = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      provider_token: response.accessToken,
      provider: 'google',
      provider_id: response.googleId,
      avatar_url: response.profileObj.imageUrl,
    }

    await redux.loginWithGoogle(userDetails)
    onLogin(userDetails)
  }

  render() {
    const { classes, className } = this.props

    return (
      <div className={classNames(classes.root, className)}>
        <FacebookLogin
          appId="2175525285996959"
          fields="name,email,picture"
          callback={this.loginFacebook}
          render={props => (
            <Button
              variant="outlined"
              color="inherit"
              onClick={props.onClick}
              className={classes.button}
            >
              <FacebookBoxIcon />
              <div className={classes.text}>Facebook</div>
            </Button>
          )}
        />

        <GoogleLogin
          clientId="860110060796-1oa17isdultt097medmjdslaovs204o9.apps.googleusercontent.com"
          fields="name,email,picture"
          onFailure={this.loginGoogle}
          onSuccess={this.loginGoogle}
          render={props => (
            <Button
              variant="outlined"
              color="inherit"
              onClick={props.onClick}
              className={classes.button}
            >
              <GoogleIcon />
              <div className={classes.text}>Google</div>
            </Button>
          )}
        />
      </div>
    )
  }
}

SocialLoginActions.propTypes = {
  classes: object.isRequired,
  className: string,
  onLogin: func.isRequired,
  redux: shape({
    loginWithFacebook: func.isRequired,
    loginWithGoogle: func.isRequired,
  })
}

const redux = () => ({
  loginWithFacebook: actions.auth.facebook,
  loginWithGoogle: actions.auth.google,
})

export default withStyles(styles)(connect(redux)(SocialLoginActions))
