import React from 'react'
import { object, shape } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import { AccountDropdown, BackButton, Header, Logo } from 'components/index'
import { Link } from 'react-router-dom'
import userShape from 'shapes/user'
import { connect, select } from 'src/redux'

const styles = theme => ({
  root: {},

  logo: {
    marginLeft: 10,
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      flex: 'inherit',
    }
  },

  logoTitle: {
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      color: 'white'
    }
  },

  navigation: {
    flex: 1,
    display: 'none',
    marginLeft: 15,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      marginLeft: 60,
    }
  },
})

const DefaultHeader = ({ classes, redux: { user } }) =>
  <Header className={classes.root}>
    <BackButton />
    <Logo classes={{ root: classes.logo, title: classes.logoTitle }} />
    <div className={classes.navigation}>
      {user && (
        <Link to="/profile">
          <Button color="inherit">мои компании</Button>
        </Link>)}
      {user && (
        <Link className={classes.company} to="/rooms">
          <Button color="inherit">найти компанию</Button>
        </Link>
      )}
    </div>
    <AccountDropdown />
  </Header>

DefaultHeader.propTypes = {
  classes: object.isRequired,
  redux: shape({
    user: userShape,
  })
}

const redux = state => ({
  user: select.auth.user(state)
})

export default withStyles(styles)(connect(redux)(DefaultHeader))
