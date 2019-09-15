import React, { Component } from 'react'
import { withStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import AccountIcon from 'mdi-react/AccountIcon'
import HomeIcon from 'mdi-react/HomeIcon'
import PlusBoxOutlineIcon from 'mdi-react/PlusBoxOutlineIcon'
import BellIcon from 'mdi-react/BellIcon'
import SearchIcon from 'mdi-react/SearchIcon'
import { withRouter, Link } from 'react-router-dom'
import { func, object, shape, string } from 'prop-types'
import { actions, connect } from 'src/redux'

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  label: {
    display: 'none',
  }
})

class AppBottomNavigation extends Component {

  createRoom = async () => {
    const { history, redux: { createRoom } } = this.props
    const action = await createRoom()
    history.push(`/rooms/${action.value.id}`)
  }

  render() {
    const { match, classes } = this.props
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
          onClick={this.createRoom}
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
}

AppBottomNavigation.propTypes = {
  classes: object.isRequired,
  match: shape({ path: string }),
  history: shape({ push: func }),
  redux: shape({
    createRoom: func.isRequired,
  })
}

const redux = () => ({
  createRoom: actions.rooms.create,
})

export default withStyles(styles)(connect(redux)(withRouter(AppBottomNavigation)))
