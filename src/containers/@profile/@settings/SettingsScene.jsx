import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import userShape from 'shapes/user'
import { withStyles } from '@material-ui/core'
import { OutlineCard } from 'components'
import ContactForm from './ContactForm'
import UserForm from './UserForm'
import PasswordForm from './PasswordForm'
import AvatarForm from './AvatarForm'
import { select, connect, actions } from 'src/redux'

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    width: 450,
    marginBottom: 30,
  },

}

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
          <AvatarForm user={user} onSubmit={updateUser} />
          <OutlineCard className={classes.card} title="Общее">
            <UserForm user={user} onSubmit={updateUser} />
          </OutlineCard>
          <OutlineCard className={classes.card} title="Контакты">
            <ContactForm account={user.account} onSubmit={updateAccount} />
          </OutlineCard>
          <OutlineCard className={classes.card} title="Пароль">
            <PasswordForm onSubmit={updatePassword} />
          </OutlineCard>
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
