import React from 'react'
import { object, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const styles = () => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginTop: -3
  },
  title: {},
  city: {
    fontWeight: '100',
    padding: '0 15px',
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
