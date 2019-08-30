import React, { Component } from 'react'
import { object, func, bool, string } from 'prop-types'
import { Dialog, IconButton, Tooltip, Typography, withStyles } from '@material-ui/core'
import { FRONTEND_URL } from 'config/app'
import wait from 'utils/wait'
import CopyIcon from 'mdi-react/ContentCopyIcon'

const styles = {
  root: {},
  paper: {
    width: 550,
    padding: 20,
    overflowY: 'visible'
  },
  invite: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    paddingLeft: 5,
  }
}

class InviteDialog extends Component {

  state = {
    isCopied: false,
  }
  copy = async () => {
    const { invite_token } = this.props
    const { clipboard } = navigator
    try {
      await clipboard.writeText(`${FRONTEND_URL}/${invite_token}`)
      this.setState({ isCopied: true })
      await wait(2000)
      this.setState({ isCopied: false })
    } catch (e) {

    }
  }

  render() {
    const { classes, invite_token, isOpen, onClose } = this.props
    const { isCopied } = this.state
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        classes={{ paper: classes.paper }}
        className={classes.root}
      >
        <Typography color="textSecondary" variant="caption">
          Скопируй эту ссылку и отправь друзьям что бы пригласить
        </Typography>
        <div className={classes.invite}>
          <Tooltip title={isCopied ? 'Ссылка скопирована' : 'Скопировать сслыку'}>
            <IconButton onClick={this.copy} className={classes.icon}><CopyIcon /></IconButton>
          </Tooltip>
          <Typography className={classes.text} color="primary">
            {isCopied
              ? 'Пригласительная сслыка скопирована'
              : `${FRONTEND_URL}/invite/${invite_token}`
            }
          </Typography>
        </div>
      </Dialog>
    )
  }
}

InviteDialog.propTypes = {
  classes: object.isRequired,
  invite_token: string.isRequired,
  isOpen: bool,
  onClose: func,
}

export default withStyles(styles)(InviteDialog)
