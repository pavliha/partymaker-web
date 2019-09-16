import React, { Component } from 'react'
import { object, shape, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AccountButton } from 'components'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  userName: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  }
})

class Account extends Component {

  render() {
    const { classes, className, user } = this.props

    return (
      <Link to="/profile" className={className}>
        <div className={classes.root}>
          <Typography className={classes.userName} variant="subtitle1" color="inherit">{user.name}</Typography>
          <AccountButton user={user} />
        </div>
      </Link>
    )
  }
}

Account.propTypes = {
  classes: object.isRequired,
  className: string,
  user: shape({
    name: string.isRequired,
    avatar_url: string.isRequired,
  }).isRequired,
}

Account.defaultProps = {
  user: null,
}

export default withStyles(styles)(Account)
