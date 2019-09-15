import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles, IconButton, SvgIcon } from '@material-ui/core'
import LogoIcon from 'assets/images/logo-filled.svg'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -3
  },
  city: {
    fontWeight: '100',
    padding: '0 15px',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },
  fullTitle: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },
  shortTitle: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  logoIcon: {
    color: 'white',
  }
})

const Logo = ({ classes }) =>
  <div className={classes.root}>
    <Typography className={classes.fullTitle} variant="h6" color="inherit">
      Partymaker
    </Typography>
    <IconButton>
      <SvgIcon>
        <LogoIcon className={classes.logoIcon} />
      </SvgIcon>
    </IconButton>
    <Typography className={classes.city} color="inherit">Запорожье</Typography>
  </div>

Logo.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(Logo)
