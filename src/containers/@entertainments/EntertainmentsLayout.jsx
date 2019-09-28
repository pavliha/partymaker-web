import React, { Component, Fragment } from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { AppBottomNavigation, EntertainmentHeader, DefaultHeader } from 'components'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import EntertainmentsPlaceScene from './@places/EntertainmentPlaceScene'
import EntertainmentPlaceScene from './@id/@places/EntertainmentPlaceScene'
import EntertainmentScene from './@id/EntertainmentScene'
import EntertainmentsScene from './EntertainmentsScene'

const styles = theme => ({

  container: {
    position: 'relative',
    height: 'calc(100% - 194px)',
    overflow: 'auto',
    flex: 1,
    display: 'flex',
  },

  aside: {
    display: 'none',
    right: 0,
    flexDirection: 'column',
    top: 50,
    bottom: 0,
    overflow: 'auto',
    width: '35%',
    padding: 15,
    borderLeft: '1px rgba(0,0,0,0.1) solid',
    [theme.breakpoints.up('lg')]: {
      display: 'flex'
    },
  },

  list: {
    maxWidth: 870,
    flex: 1,
    overflow: 'auto',
    [theme.breakpoints.up('lg')]: {
      paddingRight: 15,
    },
  },

})

class EntertainmentsLayout extends Component {

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Helmet><title>Partymaker - Поиск развлечений</title></Helmet>
        <Switch>
          <Route exact path="/entertainments/:id" component={EntertainmentHeader} />
          <Route path="/entertainments" component={DefaultHeader} />
        </Switch>
        <section className={classes.container}>
          <div className={classes.list}>
            <Switch>
              <Route path="/entertainments" component={EntertainmentsScene} />
              <Route path="/entertainments/:id" component={EntertainmentScene} />
            </Switch>
          </div>
          <Route exact path="/entertainments/places/:id" component={EntertainmentsPlaceScene} />
          <Route exact path="/entertainments/:id/places/:id" component={EntertainmentPlaceScene} />
        </section>
        <AppBottomNavigation />
      </Fragment>
    )
  }
}

EntertainmentsLayout.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(EntertainmentsLayout)
