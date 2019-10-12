import React from 'react'
import { object, string, node } from 'prop-types'
import { Toolbar, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: 65,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    }
  },
})

const Header = ({ classes, className, children }) =>
  <header className={classNames([classes.root, className])}>
    <Toolbar>
      {children}
    </Toolbar>
  </header>

Header.propTypes = {
  classes: object.isRequired,
  className: string,
  children: node,
}

export default withStyles(styles)(Header)
