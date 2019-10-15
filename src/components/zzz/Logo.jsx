import React from 'react'
import { object, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    margin: 15,
  },
  title: {
    fontFamily: 'Google Sans',
    color: theme.palette.primary.main,
  },
  city: {
    fontFamily: 'Google Sans',
    fontWeight: '100',
    paddingLeft: '15px',
  },
})

const Logo = ({ classes, className }) =>
  <Link to="/" component="div" className={classNames(classes.root, className)}>
    <Typography className={classes.title} variant="h6" color="inherit">
      Partymaker
    </Typography>
    <Typography className={classes.city}>Запорожье</Typography>
  </Link>

Logo.propTypes = {
  classes: object.isRequired,
  className: string,
}

export default withStyles(styles)(Logo)
