import React, { Component } from 'react'
import { object, func, string } from 'prop-types'
import { withStyles, IconButton, Tooltip } from '@material-ui/core'
import CopyIcon from 'mdi-react/ContentCopyIcon'
import wait from 'utils/wait'
import CloseButton from 'components/CloseButton'
import { FRONTEND_URL } from 'src/config/app'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: 72,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'content-box',
    padding: '0px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },
  icon: {
    marginRight: 10,
    marginLeft: 3,
  },
  container: {
    flex: 1,
  }

})

class InviteOverlay extends Component {

  state = {
    isCopied: false,
  }

  copy = async () => {
    const { invite_token } = this.props
    const { clipboard } = navigator
    try {
      await clipboard.writeText(`http://partymaker.zp.ua/${invite_token}`)
      this.setState({ isCopied: true })
      await wait(2000)
      this.setState({ isCopied: false })
    } catch (e) {

    }
  }

  render() {
    const { classes, invite_token, onClose } = this.props
    const { isCopied } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Tooltip title="Скопировать сслыку">
            <IconButton onClick={this.copy} className={classes.icon}><CopyIcon /></IconButton>
          </Tooltip>
          <span>{isCopied ? 'Пригласительная сслыка скопирована' : `${FRONTEND_URL}/invite/${invite_token}`}</span>
        </div>
        <CloseButton onClick={onClose} />
      </div>
    )
  }
}

InviteOverlay.propTypes = {
  classes: object.isRequired,
  invite_token: string,
  onClose: func.isRequired,
}

export default withStyles(styles)(InviteOverlay)
