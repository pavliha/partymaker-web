import React from 'react'
import { object, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { LeftNavigationItem as MenuItem, Logo } from 'components'
import BellIcon from 'mdi-react/BellIcon'
import PeopleGroupIcon from 'mdi-react/PeopleGroupIcon'
import LocationIcon from 'mdi-react/LocationIcon'
import SettingsIcon from 'mdi-react/SettingsIcon'
import AccountIcon from 'mdi-react/AccountIcon'

const styles = {
  root: {
    width: 300,
    borderRight: '1px solid rgba(0,0,0,0.1)',
    height: '100%'
  },

  logo: {
    marginTop: 27,
  },

  nav: {
    marginTop: 30,
    marginRight: 30,
  }
}

const LeftNavigation = ({ classes, className }) =>
  <div className={classNames([classes.root, className])}>
    <Logo className={classes.logo} />
    <nav className={classes.nav}>
      <MenuItem url="/profile" icon={AccountIcon}>Моя страница</MenuItem>
      <MenuItem url="/entertainments" icon={LocationIcon}>Найти место</MenuItem>
      <MenuItem url="/rooms" icon={PeopleGroupIcon}>Найти компанию</MenuItem>
      <MenuItem url="/profile/notifications" icon={BellIcon}>Уведомления</MenuItem>
      <MenuItem url="/profile/settings" icon={SettingsIcon}>Настройки</MenuItem>
    </nav>
  </div>

LeftNavigation.propTypes = {
  classes: object.isRequired,
  className: string,
}

export default withStyles(styles)(LeftNavigation)
