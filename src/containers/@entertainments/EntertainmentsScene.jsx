import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { EntertainmentsLoader, EntertainmentsSearch, DefaultHeader } from 'components'
import EntertainmentPlaceScene from './@id/@places/EntertainmentPlaceScene'
import { Route } from 'react-router-dom'

const styles = theme => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  },

  container: {
    height: 'calc(100% - 64px)',
    display: 'flex',
  },

  searchArea: {
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 20,
    paddingBottom: 15,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 30,
      paddingBottom: 30,
    }
  },

  list: {
    overflow: 'auto',
    flex: 1,
  },

  listLoader: {
    overflow: 'auto',
    height: 'calc(100% - 110px)'
  },

  aside: {
    borderLeft: '1px solid rgba(0,0,0,0.1)',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inherit',
      width: 350,
    },
    [theme.breakpoints.up('md')]: {
      width: 650,
    },
    position: 'relative',
  }
})

class EntertainmentsScene extends Component {

  redirectToRoom = (room) => {
    const { history } = this.props
    history.push(`/rooms/${room.id}`)
  }

  selectPlace = place => {
    const { history } = this.props
    const { matches } = window.matchMedia('(max-width: 768px)')
    history.push(matches ? `/places/${place.id}` : `/entertainments/places/${place.id}`)
  }

  render() {
    const { classes } = this.props

    return (
      <section className={classes.root}>
        <DefaultHeader />
        <div className={classes.container}>
          <div className={classes.list}>
            <div className={classes.searchArea}>
              <EntertainmentsSearch />
            </div>
            <div className={classes.listLoader}>
              <EntertainmentsLoader
                onCreated={this.redirectToRoom}
                onSelectPlace={this.selectPlace}
              />
            </div>
          </div>
          <aside className={classes.aside}>
            <Route
              path="/entertainments/places/:id"
              component={EntertainmentPlaceScene}
            />
          </aside>
        </div>
      </section>
    )
  }
}

EntertainmentsScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
}

export default withStyles(styles)(EntertainmentsScene)
