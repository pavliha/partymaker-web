import React from 'react'
import { node, object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Card, CardHeader } from '@material-ui/core'

const styles = theme => ({
  root: {
    maxWidth: '100%',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      width: 400,
    }
  },
  title: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 10,
    textAlign: 'center',
  },
})

const AuthCard = ({ classes, children, title }) =>
  <Card className={classes.root}>
    <CardHeader className={classes.title} title={title} />
    {children}
  </Card>

AuthCard.propTypes = {
  children: node,
  title: node.isRequired,
  classes: object.isRequired,
}

AuthCard.defaultProps = {
  children: null,
}

export default withStyles(styles)(AuthCard)
