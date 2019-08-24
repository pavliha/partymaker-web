import React from 'react'
import { object, bool, string } from 'prop-types'
import userShape from 'shapes/user'
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { UserMenu, Logo } from 'components'
import classNames from 'classnames'

const styles = {
  root: {},

  transparent: {
    position: 'absolute',
    background: 'transparent',
    boxShadow: 'none',
    top: 0,
  },
  navigation: {
    flex: 1,
    marginLeft: 60,
  }
}

const Header = ({ classes, className, user, isTransparent }) =>
  <AppBar
    position="static"
    color="primary"
    className={classNames({
      [classes.root]: true,
      [classes.transparent]: isTransparent,
      [className]: true,
    })}
  >
    <Toolbar>
      <Link to="/"><Logo /></Link>
      <div className={classes.navigation}>
        {user && <Link to="/rooms"><Button color="inherit">мои компани</Button></Link>}
      </div>
      {user
        ? <UserMenu user={user} />
        : <>
          <Link to="/auth/login">
            <Button color="inherit">войти</Button>
          </Link>
          <Link to="/auth/register">
            <Button color="inherit">регистрация</Button>
          </Link>
        </>
      }

    </Toolbar>
  </AppBar>

Header.propTypes = {
  classes: object.isRequired,
  className: string,
  isTransparent: bool,
  user: userShape,
}

Header.defaultProps = {
  user: null,
}

export default withStyles(styles)(Header)
