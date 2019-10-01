import React from 'react'
import { object, shape, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: 5,
    }
  },
  backIcon: {
    color: 'white',
  },
})

const BackButton = ({ classes, className, history, onClick }) =>
  <div className={classNames(classes.root, className)}>
    <IconButton color="inherit" onClick={onClick || history.goBack}><ArrowBackIcon /></IconButton>
  </div>

BackButton.propTypes = {
  history: shape({ goBack: func }),
  classes: object.isRequired,
  className: string,
  onClick: func,
}

export default withStyles(styles)(withRouter(BackButton))
