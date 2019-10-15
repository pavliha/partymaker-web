import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import userShape from 'shapes/user'
import { Typography, withStyles } from '@material-ui/core'
import { ContactsForm, ProfileForm, PasswordChangeForm, AvatarForm, Form, BackButton } from 'components'
import { select, connect, actions } from 'src/redux'

const styles = () => ({
  root: {},
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(0,0,0,0.1)',
    maxWidth: 500,
    paddingRight: 15,
  },

  title: {
    paddingLeft: 5,
    fontSize: 20,
  },

  subtitle: {
    paddingLeft: 15,
    fontFamily: 'Google Sans',
    fontWeight: 'bold',
  },

  heading: {
    marginLeft: 20,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  }
})

class SettingsScene extends Component {

  componentDidMount() {
    const { redux } = this.props
    redux.loadAccount()
  }

  render() {
    const { classes, redux } = this.props
    const { user, updateUser, updateAccount, updatePassword } = redux

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.heading}>
            <BackButton />
            <Typography component="div" className={classes.title}>
              Настройки
            </Typography>
          </div>
          <Form
            component={AvatarForm}
            username={user?.name}
            onSubmit={updateUser}
          />
          <Typography className={classes.subtitle}>Общее</Typography>
          <Form
            component={ProfileForm}
            user={user}
            onSubmit={updateUser}
          />
          <Typography className={classes.subtitle}>Контакты</Typography>
          <Form
            component={ContactsForm}
            account={user.account}
            onSubmit={updateAccount}
          />
          <Typography className={classes.subtitle}>Пароль</Typography>
          <Form
            component={PasswordChangeForm}
            onSubmit={updatePassword}
          />
        </div>
      </div>
    )
  }
}

SettingsScene.propTypes = {
  classes: object.isRequired,
  redux: shape({
    user: userShape.isRequired,
    updateUser: func.isRequired,
    loadAccount: func.isRequired,
    updateAccount: func.isRequired,
    updatePassword: func.isRequired,
  }),
}

const redux = (state) => ({
  user: select.auth.user(state),
  updateUser: actions.auth.user.update,
  loadAccount: actions.auth.user.account.load,
  updateAccount: actions.auth.user.account.update,
  updatePassword: actions.auth.password.update,
})

export default withStyles(styles)(connect(redux)(SettingsScene))
