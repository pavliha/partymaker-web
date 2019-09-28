import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { EntertainmentsLoader, EntertainmentsSearch } from 'components'

const styles = theme => ({

  root: {},

  searchArea: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 20,
    paddingBottom: 15,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 40,
      paddingBottom: 30,
    }
  },

  listLoader: {
    padding: 10,
  }
})

class EntertainmentsScene extends Component {

  redirectToRoom = (room) => {
    const { history } = this.props
    history.push(`/rooms/${room.id}`)
  }

  selectPlace = place => {
    const { history } = this.props
    const { matches } = window.matchMedia('(max-width: 1280px)')
    history.push(matches ? `/places/${place.id}` : `/entertainments/places/${place.id}`)
  }

  render() {
    const { classes } = this.props

    return (
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
    )
  }
}

EntertainmentsScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
}

export default withStyles(styles)(EntertainmentsScene)
