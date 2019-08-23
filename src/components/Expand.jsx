import React from 'react'
import { object, string, node } from 'prop-types'
import { Typography, withStyles, IconButton } from '@material-ui/core'
import ExpandMoreIcon from 'mdi-react/ExpandMoreIcon'

const styles = {
  root: {},

  expand: {
    display: 'flex',
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: 'center',
  },

  title: {
    cursor: 'pointer',
    paddingLeft: 5,
    fontSize: 20,
  }

}

const Expand = ({ classes, title, children }) =>
  <div className={classes.root}>
    <div className={classes.expand}>
      <IconButton><ExpandMoreIcon /></IconButton>
      <Typography className={classes.title}>
        {title}
      </Typography>
    </div>
    {children}
  </div>

Expand.propTypes = {
  classes: object.isRequired,
  title: string.isRequired,
  children: node.isRequired,
}

export default withStyles(styles)(Expand)
