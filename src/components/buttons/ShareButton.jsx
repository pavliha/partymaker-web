import React from 'react'
import classNames from 'classnames'
import { object, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import ShareIcon from 'mdi-react/ShareVariantIcon'

const styles = theme => ({
  root: {
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: 5,
    }
  },
})

const ShareButton = ({ classes, className, onClick }) =>
  <div className={classNames(classes.root, className)}>
    <IconButton color="inherit" onClick={onClick}><ShareIcon /></IconButton>
  </div>

ShareButton.propTypes = {
  classes: object.isRequired,
  onClick: func.isRequired,
  className: string,
}

export default withStyles(styles)(ShareButton)