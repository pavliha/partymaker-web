import React from 'react'
import { AppBottomNavigation, LeftNavigation } from 'components'
import { withStyles } from '@material-ui/core'
import { node, object, string } from 'prop-types'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%'
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: 301,
      width: 'calc(100% - 301px)',
    },
  },

  leftNavigation: {
    position: 'fixed',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },

  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },

})

const NavigationContainer = ({ classes, className, children }) =>
  <section className={classNames([classes.root, className])}>
    <LeftNavigation className={classes.leftNavigation} />
    <div className={classes.container}>
      {children}
    </div>
    <AppBottomNavigation className={classes.bottomNavigation} />
  </section>

NavigationContainer.propTypes = {
  classes: object.isRequired,
  children: node,
  className: string,
}

export default withStyles(styles)(NavigationContainer)
