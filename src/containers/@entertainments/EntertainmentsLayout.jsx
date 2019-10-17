import React from 'react'
import { Route, Switch } from 'react-router-dom'
import EntertainmentScene from './@id/EntertainmentScene'
import EntertainmentsScene from './EntertainmentsScene'
import { NavigationContainer } from 'components'
import { withStyles } from '@material-ui/core'
import { object } from 'prop-types'

const styles = () => ({})

const EntertainmentsLayout = ({ classes }) =>
  <NavigationContainer className={classes.root}>
    <Switch>
      <Route exact path="/entertainments" component={EntertainmentsScene} />
      <Route exact path="/entertainments/:id" component={EntertainmentScene} />
    </Switch>
  </NavigationContainer>

EntertainmentsLayout.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(EntertainmentsLayout)
