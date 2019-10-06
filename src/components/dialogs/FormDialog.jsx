import React from 'react'
import { object, func, bool, string, node } from 'prop-types'
import { Dialog, DialogTitle, withStyles } from '@material-ui/core'
import { CloseButton } from 'components'

const styles = {
  root: {},
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 2,
  },
}

const FormDialog = ({ classes, title, isOpen, onClose, children }) =>
  <Dialog open={isOpen} onClose={onClose}>
    <div className={classes.heading}>
      <DialogTitle>{title || ''}</DialogTitle>
      <CloseButton onClick={onClose} />
    </div>
    {children}
  </Dialog>

FormDialog.propTypes = {
  classes: object.isRequired,
  title: string,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  children: node,
}

export default withStyles(styles)(FormDialog)
