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
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
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
