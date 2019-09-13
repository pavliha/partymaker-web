import React, { Component } from 'react'
import { object, func, bool, shape } from 'prop-types'
import { Dialog, withStyles, Typography } from '@material-ui/core'
import SocialLogin from 'components/SocialLoginActions'
import { AuthCard, RegisterForm, LoginForm } from 'components'
import { connect, actions } from 'src/redux'

const styles = {
  root: {},
  paper: {
    overflowY: 'visible',
    margin: 10,
  },
  social: {
    position: 'absolute',
    top: 425,
    width: '100%',
    left: 0,
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px',
    paddingTop: 5,
    marginBottom: -10,

  },
  link: {
    color: '#0083bc',
    cursor: 'pointer'
  }
}

class AuthDialog extends Component {

  state = {
    current: 'Авторизация'
  }

  switchToRegister = () =>
    this.setState({ current: 'Регистрация' })

  switchToLogin = () =>
    this.setState({ current: 'Авторизация' })

  login = async (form) => {
    const { redux, onAuth } = this.props
    const action = await redux.login(form)
    onAuth(action)
    return action
  }

  register = async (form) => {
    const { redux, onAuth } = this.props
    const action = await redux.register(form)
    onAuth(action)
    return action
  }

  render() {
    const { classes, isOpen, onClose, onAuth } = this.props
    const { current } = this.state

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        classes={{ paper: classes.paper }}
        className={classes.root}
      >
        <AuthCard title={current}>
          <div className={classes.links}>
            <Typography
              className={classes.link}
              onClick={current === 'Авторизация' ? this.switchToRegister : this.switchToLogin}
            >
              {current === 'Авторизация' ? 'Создать аккаунт' : 'Войти'}
            </Typography>
          </div>
          {current === 'Авторизация'
            ? <LoginForm onSubmit={this.login} />
            : <RegisterForm onSubmit={this.register} />
          }
        </AuthCard>
        <SocialLogin className={classes.social} onLogin={onAuth} />
      </Dialog>
    )
  }
}

AuthDialog.propTypes = {
  classes: object.isRequired,
  isOpen: bool,
  onAuth: func,
  onClose: func,
  redux: shape({
    login: func,
    register: func,
  })
}
const redux = () => ({
  login: actions.auth.login,
  register: actions.auth.register,
})
export default withStyles(styles)(connect(redux)(AuthDialog))
