import React, { Component } from 'react'
import { object, string, node } from 'prop-types'
import { Typography, withStyles, IconButton } from '@material-ui/core'
import ExpandMoreIcon from 'mdi-react/KeyboardArrowUpIcon'
import CollapseIcon from 'mdi-react/KeyboardArrowDownIcon'

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

class Expand extends Component {
  state = {
    isExpanded: true,
  }

  expand = () =>
    this.setState({ isExpanded: true })

  collapse = () =>
    this.setState({ isExpanded: false })

  render() {
    const { classes, title, children } = this.props
    const { isExpanded } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.expand}>
          {isExpanded
            ? <IconButton onClick={this.collapse}><CollapseIcon /></IconButton>
            : <IconButton onClick={this.expand}><ExpandMoreIcon /></IconButton>
          }
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
