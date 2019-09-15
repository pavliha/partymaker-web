import React from 'react'
import { withStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import AccountIcon from 'mdi-react/AccountIcon'
import HomeIcon from 'mdi-react/HomeIcon'
import PlusBoxOutlineIcon from 'mdi-react/PlusBoxOutlineIcon'
import BellIcon from 'mdi-react/BellIcon'
import SearchIcon from 'mdi-react/SearchIcon'
import { withRouter, Link } from 'react-router-dom'
import { object, shape, string } from 'prop-types'

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  label: {
    display: 'none',
  }
}

const AppBottomNavigation = ({ match, classes }) => {
  return (
    <BottomNavigation value={match.path} className={classes.root}>
      <BottomNavigationAction
        classes={{ label: classes.label }}
        component={Link}
        to="/entertainments"
        label="Куда сходить"
        value="/entertainments"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        classes={{ label: classes.label }}
        label="Поиск"
        value="/search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        classes={{ label: classes.label }}
        label="Собрать компанию"
        value="/rooms/create"
        icon={<PlusBoxOutlineIcon />}
      />
      <BottomNavigationAction
        classes={{ label: classes.label }}
        label="Уведомления"
        value="/notifications"
        icon={<BellIcon />}
      />
      <BottomNavigationAction
        classes={{ label: classes.label }}
        component={Link}
        to="/profile"
        label="Аккаунт"
        value="/profile"
        icon={<AccountIcon />}
      />
    </BottomNavigation>
  )
}
AppBottomNavigation.propTypes = {
  classes: object.isRequired,
  match: shape({ path: string })
}

export default withStyles(styles)(withRouter(AppBottomNavigation))
