import React from 'react'
import { object, bool, string, shape, func } from 'prop-types'
import userShape from 'shapes/user'
import { AppBar, Toolbar, Button, withStyles, IconButton } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { UserMenu, Logo } from 'components'
import classNames from 'classnames'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'

const styles = theme => ({
  root: {},

  transparent: {
    position: 'absolute',
    background: 'transparent',
    boxShadow: 'none',
    top: 0,
  },
  navigation: {
    flex: 1,
    marginLeft: 15,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 60,
    }
  },
  backIcon: {
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inherit',
    }
  }
})

const Header = ({ classes, history, className, user, isTransparent }) =>
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
      <IconButton className={classes.backIcon} onClick={history.goBack}>
        <ArrowBackIcon />
      </IconButton>
      <Link className={classes.logo} to="/"><Logo /></Link>
      <div className={classes.navigation}>
        {user && <Link to="/profile"><Button color="inherit">моя страница</Button></Link>}
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
  history: shape({ goBack: func }),
  className: string,
  isTransparent: bool,
  user: userShape,
}

Header.defaultProps = {
  user: null,
}

export default withStyles(styles)(withRouter(Header))
