import React, { Component } from 'react'
import { bool, object, func } from 'prop-types'
import { Button, CircularProgress, Dialog, DialogActions, withStyles } from '@material-ui/core'
import Asset from 'api/asset'
import { DialogPicture } from 'components'

const styles = {
  dialog: {
    maxWidth: 400,
  },
  confirmButton: {
    marginLeft: 8,
    marginRight: 5,
  },
  loading: {
    marginRight: 3,
  },
}

class ClipboardImageDialog extends Component {

  state = {
    isLoading: false,
  }

  uploadAttachment = async () => {
    const { file, onClose, onConfirm } = this.props
    this.setState({ isLoading: true })

    try {
      const asset = await Asset.create(file)
      onConfirm(asset)
    } catch (e) {
      onClose()
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { classes, isOpen, file, onClose } = this.props
    const { isLoading } = this.state

    if (!isOpen) return null

    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogPicture file={file} />
        <DialogActions>
          <Button onClick={onClose}>Отменить</Button>
          <Button
            className={classes.confirmButton}
            onClick={this.uploadAttachment}
            variant="outlined"
            color="primary"
            autoFocus
          >
            {isLoading && (
              <CircularProgress
                className={classes.loading}
                color="inherit"
                debounce={0}
                size={15}
              />
            )}
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ClipboardImageDialog.propTypes = {
  classes: object.isRequired,
  isOpen: bool.isRequired,
  file: object,
  onClose: func.isRequired,
  onConfirm: func.isRequired,
}

ClipboardImageDialog.defaultProps = {
  file: null,
}

export default withStyles(styles)(ClipboardImageDialog)
