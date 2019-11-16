import React, { Component } from 'react'
import { bool, object, oneOfType, number, shape, string, func } from 'prop-types'
import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import classNames from 'classnames'
import initials from 'name-initials'
import { PictureDialog, OnlineIndicator } from 'components'

const styles = () => ({
  avatar: {
    position: 'relative',
  },
  root: {
    alignSelf: 'center',
    width: 45,
    height: 45,
    cursor: 'pointer',
  },
  small: {
    width: 36,
    fontSize: 14,
    height: 36,
  },
})

class UserAvatar extends Component {

  state = {
    isModalOpen: false,
  }

  open = () => {
    this.setState({ isModalOpen: true })
  }

  close = () => {
    this.setState({ isModalOpen: false })
  }

  overrides = () => {
    const { classes, small, className } = this.props

    return classNames({
      [classes.root]: true,
      [classes.small]: small,
      [className]: true,
    })
  }

  render() {
    const { classes, user, is_online, clickable, onClick } = this.props
    const { isModalOpen } = this.state

    if (!user) return null

    return (
      <div className={classes.avatar}>
        <Avatar
          onClick={clickable ? this.open : onClick}
          className={this.overrides()}
          src={user.avatar_url}
        >
          {user.avatar_url ? null : initials(user.name)}
        </Avatar>
        <OnlineIndicator isVisible={is_online} />
        <PictureDialog
          url={user.avatar_url}
          isOpen={isModalOpen}
          onClose={this.close}
        />
      </div>
    )
  }
}

UserAvatar.propTypes = {
  classes: object.isRequired,
  className: string,
  small: bool,
  is_online: oneOfType([bool, number]),
  user: shape({
    name: string,
    avatar_url: string,
  }).isRequired,
  clickable: bool,
  onClick: func,
}

UserAvatar.defaultProps = {
  small: false,
}

export default withStyles(styles)(UserAvatar)
