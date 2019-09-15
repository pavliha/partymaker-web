import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles, IconButton } from '@material-ui/core'
import { UserAvatar } from 'components'
import { userShape } from 'shapes'
import { Link } from 'react-router-dom'
import AccountEditIcon from 'mdi-react/AccountEditIcon'
import LogoutIcon from 'mdi-react/LogoutIcon'

const styles = {
  root: {
    paddingTop: 20,
    paddingLeft: 5,
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  link: {
    display: 'block',
  }
}

const Profile = ({ classes, user }) =>
  <div className={classes.root}>
    <UserAvatar clickable className={classes.avatar} user={user} />
    <div className={classes.info}>
      <Typography gutterBottom>{user.name}</Typography>
      <Typography gutterBottom color="textSecondary">{user.email}</Typography>
      <Typography gutterBottom color="textSecondary">{user.phone}</Typography>
    </div>
    <div>
      <Link className={classes.link} to="/profile/settings">
        <IconButton>
          <AccountEditIcon />
        </IconButton>
      </Link>
      <Link to="/auth/logout">
        <IconButton>
          <LogoutIcon />
        </IconButton>
      </Link>
    </div>
  </div>

Profile.propTypes = {
  classes: object.isRequired,
  user: userShape.isRequired,
}

export default withStyles(styles)(Profile)
