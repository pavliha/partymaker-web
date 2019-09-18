import React from 'react'
import { node, object, string } from 'prop-types'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import KeyboardArrowRightIcon from 'mdi-react/ArrowRightIcon'

const styles = theme => ({
  root: {
    marginLeft: 5,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
    }
  },

  expand: {
    display: 'flex',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    cursor: 'pointer',
    paddingLeft: 5,
    fontSize: 20,
  }

})

const Expand = ({ classes, title, children }) =>
  <div className={classes.root}>
    <div className={classes.expand}>
      <Typography component="div" className={classes.title}>
        {title}
      </Typography>
      <IconButton>
        <KeyboardArrowRightIcon />
      </IconButton>
    </div>
    {children}
  </div>

Expand.propTypes = {
  classes: object.isRequired,
  title: string.isRequired,
  children: node.isRequired,
}

export default withStyles(styles)(Expand)
