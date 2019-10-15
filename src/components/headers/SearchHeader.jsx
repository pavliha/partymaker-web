import React from 'react'
import { object, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { AccountDropdown, EntertainmentsSearch, Header, Logo } from 'components'

const styles = {
  root: {},
  toolbar: {
    flex: 1,
  },
  logo: {
    width: 305,
  }
}

const SearchHeader = ({ classes, onSearch }) =>
  <Header>
    <Logo className={classes.logo} />
    <div className={classes.toolbar}>
      <EntertainmentsSearch onChange={onSearch} />
    </div>
    <AccountDropdown />
  </Header>

SearchHeader.propTypes = {
  classes: object.isRequired,
  onSearch: func.isRequired,
}

export default withStyles(styles)(SearchHeader)
