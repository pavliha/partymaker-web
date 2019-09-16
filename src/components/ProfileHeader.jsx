import React, { Component } from 'react'
import { object } from 'prop-types'
import { Toolbar, withStyles, AppBar, Button } from '@material-ui/core'
import { Logo, Account, AccountDropdown } from 'components'
import { userShape } from 'shapes'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {},
  container: {
    flex: 1,
  },
  navigation: {
    paddingLeft: 15,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inherit'
    }
  },
  accountDropdown: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },

  account: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inherit'
    }
  }
})

class ProfileHeader extends Component {

  render() {
    const { classes, user } = this.props
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Logo />
          <div className={classes.container}>
            <div className={classes.navigation}>
              <Link to="/entertainments"><Button color="inherit">куда сходить c друзьям?</Button></Link>
              <Link to="/rooms"><Button color="inherit">найти компанию</Button></Link>
            </div>
          </div>
          <Account user={user} className={classes.account} />
          <AccountDropdown className={classes.accountDropdown} />
        </Toolbar>
      </AppBar>
    )
  }
}

ProfileHeader.propTypes = {
  classes: object.isRequired,
  user: userShape,
}

export default withStyles(styles)(ProfileHeader)
