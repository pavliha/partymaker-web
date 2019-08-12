import React from 'react'
import { object, func, bool, string } from 'prop-types'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles = {
  root: {
    maxWidth: '100%',
    backgroundImage: `url(/images/transparent-background.svg)`,
  },
}

const PictureDialog = ({ classes, url, isOpen, onClose }) =>
  <Dialog
    open={isOpen}
    classes={{ paperWidthSm: classes.root }}
    onClose={onClose}
  >
    <img alt={url} src={url} width="100%" height="100%" onClick={onClose} />
  </Dialog>

PictureDialog.propTypes = {
  classes: object.isRequired,
  url: string.isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
}
export default withStyles(styles)(PictureDialog)
