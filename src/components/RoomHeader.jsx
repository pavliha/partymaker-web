import React, { Component } from 'react'
import { bool, func, object, shape } from 'prop-types'
import { Toolbar, withStyles, AppBar } from '@material-ui/core'
import { BackButton, Logo, RoomNavigation, Account } from 'components'
import { userShape, roomShape } from 'shapes'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    height: 65,
  },
  chatMenu: {
    flex: 1,
  },
  mobileHeader: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  desktopHeader: {
    display: 'none',
    flex: 1,
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  logo: {
    flex: 1,
  }
})

class RoomHeader extends Component {

  goHome = () => {
    const { history } = this.props
    history.push('/profile')
  }

  render() {
    const { classes, auth, room, isGuest, onLeave, onJoin } = this.props
    return (
      <AppBar position="static" color="primary" className={classes.root}>
        <Toolbar>
          <div className={classes.desktopHeader}>
            <Logo className={classes.logo} />
            {auth && <Account user={auth} />}
          </div>
          <div className={classes.mobileHeader}>
            <BackButton onClick={this.goHome} />
            <RoomNavigation
              className={classes.chatMenu}
              room={room}
              isGuest={isGuest}
              onLeave={onLeave}
              onJoin={onJoin}
            />
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

RoomHeader.propTypes = {
  classes: object.isRequired,
  isGuest: bool,
  auth: userShape.isRequired,
  room: roomShape.isRequired,
  onJoin: func.isRequired,
  onLeave: func.isRequired,
  history: shape({ push: func })
}

export default withStyles(styles)(withRouter(RoomHeader))
