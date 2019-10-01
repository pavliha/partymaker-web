import React, { Component } from 'react'
import { object, string } from 'prop-types'
import { IconButton, withStyles, Menu, MenuItem } from '@material-ui/core'
import MoreIcon from 'mdi-react/MoreVertIcon'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const styles = () => ({
  root: {},
  moreButton: {
    color: 'inherit',
    opacity: 0.8,
  },
})

class AccountDropdown extends Component {

  state = {
    anchorEl: null,
  }

  open = (e) =>
    this.setState({ anchorEl: e.currentTarget })

  close = () =>
    this.setState({ anchorEl: null })

  render() {
    const { classes, className } = this.props
    const { anchorEl } = this.state

    return (
      <div className={classNames(classes.root, className)}>
        <IconButton className={classes.moreButton} onClick={this.open}>
          <MoreIcon />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.close}
        >
          <MenuItem component={Link} to="/profile" onClick={this.close}>Моя страница</MenuItem>
          <MenuItem component={Link} to="/profile/settings" onClick={this.close}>Настройки</MenuItem>
          <MenuItem component={Link} to="/auth/logout" onClick={this.close}>Выйти</MenuItem>
        </Menu>
      </div>
    )
  }
}

AccountDropdown.propTypes = {
  classes: object.isRequired,
  className: string,
}

export default withStyles(styles)(AccountDropdown)
