import React, { Component } from 'react'
import { object, string, node } from 'prop-types'
import { Typography, withStyles, IconButton } from '@material-ui/core'
import ExpandMoreIcon from 'mdi-react/KeyboardArrowUpIcon'
import CollapseIcon from 'mdi-react/KeyboardArrowDownIcon'

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
  },

  title: {
    cursor: 'pointer',
    paddingLeft: 5,
    fontSize: 20,
  }

})

class Expand extends Component {
  state = {
    isExpanded: true,
  }

  toggle = () =>
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))

  render() {
    const { classes, title, children } = this.props
    const { isExpanded } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.expand} onClick={this.toggle}>
          <IconButton>
            {isExpanded ? <CollapseIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Typography className={classes.title}>
            {title}
          </Typography>
        </div>
        {isExpanded && children}
      </div>
    )
  }
}

Expand.propTypes = {
  classes: object.isRequired,
  title: string.isRequired,
  children: node.isRequired,
}

export default withStyles(styles)(Expand)
