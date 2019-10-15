import React from 'react'
import { object, shape, string } from 'prop-types'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import LogoutIcon from 'mdi-react/LogoutIcon'

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    marginRight: 5,
    fontFamily: 'Google Sans'
  }
})

const Account = ({ classes, className, user }) =>
  <Link to="/profile" className={className}>
    <div className={classes.root}>
      <Typography className={classes.name} variant="subtitle1" color="inherit">{user.name}</Typography>
      <IconButton>
        <LogoutIcon />
      </IconButton>
    </div>
  </Link>

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
