import React from 'react'
import { object, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AccountDropdown, BackButton, Header } from 'components'

const styles = {
  root: {},
  title: {
    cursor: 'pointer',
    paddingLeft: 5,
    fontSize: 18,
    flex: 1,
  },
}

const EntertainmentHeader = ({ classes, title }) =>
  <Header>
    <Link to="/entertainments">
      <BackButton />
    </Link>
    <Typography component="div" className={classes.title}>
      {title}
    </Typography>
    <AccountDropdown />
  </Header>

EntertainmentHeader.propTypes = {
  classes: object.isRequired,
  title: string,
}

export default withStyles(styles)(EntertainmentHeader)
