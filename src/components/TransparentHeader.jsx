import React from 'react'
import { object, string } from 'prop-types'
import userShape from 'shapes/user'
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { Account, LogoButton } from 'components'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    position: 'absolute',
    background: 'transparent',
    boxShadow: 'none',
    top: 0,
  },

  navigation: {
    display: 'flex',
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
  company: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inherit',
    }
  }
})

const TransparentHeader = ({ classes, className, user }) =>
  <AppBar
    position="static"
    color="primary"
    className={classNames({
      [classes.root]: true,
      [className]: true,
    })}
  >
    <Toolbar>
      <Link to="/"><LogoButton /></Link>

      <div className={classes.navigation}>
        {user && <Link to="/entertainments"><Button color="inherit">куда сходить c друзьям?</Button></Link>}
        {user && <Link className={classes.company} to="/rooms"><Button color="inherit">найти компанию</Button></Link>}
      </div>

      {user
        ? <Account user={user} />
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

TransparentHeader.propTypes = {
  classes: object.isRequired,
  className: string,
  user: userShape,
}

TransparentHeader.defaultProps = {
  user: null,
}

export default withStyles(styles)(withRouter(TransparentHeader))
