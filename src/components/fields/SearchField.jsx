import React from 'react'
import { object, func, string } from 'prop-types'
import { withStyles, IconButton, InputBase, Divider, Paper } from '@material-ui/core'
import SearchIcon from 'mdi-react/SearchIcon'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    height: 60,
  },
  input: {
    backgroundColor: 'transparent',
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

const SearchField = ({ classes, className, onChange }) =>
  <Paper className={classNames([classes.root, className])}>
    <InputBase
      className={classes.input}
      placeholder="Искать развлечения"
      inputProps={{ 'aria-label': 'Искать развлечения' }}
      onChange={onChange}
    />
    <Divider className={classes.divider} orientation="vertical" />
    <IconButton color="primary" className={classes.iconButton} aria-label="directions">
      <SearchIcon />
    </IconButton>
  </Paper>

SearchField.propTypes = {
  classes: object.isRequired,
  className: string,
  onChange: func,
}

export default withStyles(styles)(SearchField)
