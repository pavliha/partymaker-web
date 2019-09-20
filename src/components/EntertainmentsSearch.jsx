import React from 'react'
import { object } from 'prop-types'
import { withStyles, IconButton, InputBase, Divider, Paper } from '@material-ui/core'
import SearchIcon from 'mdi-react/SearchIcon'

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
})

const EntertainmentsSearch = ({ classes }) =>
  <Paper className={classes.root}>
    <InputBase
      className={classes.input}
      placeholder="Искать развлечения"
      inputProps={{ 'aria-label': 'Искать развлечения' }}
    />
    <Divider className={classes.divider} orientation="vertical" />
    <IconButton color="primary" className={classes.iconButton} aria-label="directions">
      <SearchIcon />
    </IconButton>
  </Paper>

EntertainmentsSearch.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(EntertainmentsSearch)
