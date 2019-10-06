import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { EntertainmentsLoader, EntertainmentsSearch, DefaultHeader, AppBottomNavigation, PlaceAside } from 'components'

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
    overflowX: 'auto',
    flex: 1,
  },

  listLoader: {
    overflow: 'auto',
  },
})

class EntertainmentsScene extends Component {

  state = {
    place_id: null,
    search: null,
  }

  handleLoad = ({ value: entertainments }) => {
    const firstEntertainment = entertainments[0]
    const firstPlace = firstEntertainment?.places[0]
    this.setState({ place_id: firstPlace?.id })
  }

  selectPlace = place => {
    const { history } = this.props
    const { matches } = window.matchMedia('(max-width: 768px)')
    matches ? history.push(`/places/${place.id}`) : this.setState({ place_id: place.id })
  }

  search = (e) =>
    this.setState({ search: e.target.value })

  render() {
    const { classes } = this.props
    const { place_id, search } = this.state

    return (
      <section className={classes.root}>
        <DefaultHeader />
        <div className={classes.container}>
          <div className={classes.list}>
            <div className={classes.searchArea}>
              <EntertainmentsSearch onChange={this.search} />
            </div>
            <div className={classes.listLoader}>
              <EntertainmentsLoader
                search={search}
                filter={this.filter}
                onLoad={this.handleLoad}
                onSelect={this.selectPlace}
              />
            </div>
          </div>
          <PlaceAside id={place_id} />
        </div>
        <AppBottomNavigation />
      </section>
    )
  }
}

EntertainmentsScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
}

export default withStyles(styles)(EntertainmentsScene)
