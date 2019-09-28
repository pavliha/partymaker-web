import React from 'react'
import { object, shape } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AccountDropdown, BackButton, Header } from 'components'
import entertainmentShape from 'shapes/entertainment'
import { select, connect } from 'src/redux'

const styles = {
  root: {},
  title: {
    cursor: 'pointer',
    paddingLeft: 5,
    fontSize: 18,
    flex: 1,
  },
}

const EntertainmentHeader = ({ classes, redux: { entertainment } }) =>
  <Header>
    <Link to="/entertainments">
      <BackButton />
    </Link>
    <Typography component="div" className={classes.title}>
      {entertainment?.title}
    </Typography>
    <AccountDropdown />
  </Header>

EntertainmentHeader.propTypes = {
  classes: object.isRequired,
  redux: shape({
    entertainment: entertainmentShape
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  entertainment: select.entertainments.current(state, id)
})

export default withStyles(styles)(connect(redux)(EntertainmentHeader))
