import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { entertainmentShape } from 'shapes'
import { PlacesList, Load, EntertainmentHeader } from 'components'
import { actions, connect, select } from 'src/redux'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router-dom'
import EntertainmentPlaceScene from './@places/EntertainmentPlaceScene'

const styles = () => ({

  root: {},

  container: {
    maxWidth: 960,
    margin: '0 auto',
    paddingTop: 15,
    paddingRight: 5,
    paddingLeft: 5,
  },

  header: {
    padding: '0 10px',
    height: 60,
    display: 'flex',
    alignItems: 'center',
  },

  places: {
    flexWrap: 'wrap',
  }
})

class EntertainmentScene extends Component {

  selectPlace = place => {
    const { history, redux: { entertainment } } = this.props
    const { matches } = window.matchMedia('(max-width: 1280px)')
    history.push(matches ? `/places/${place.id}` : `/entertainments/${entertainment.id}/places/${place.id}`)
  }

  render() {
    const { classes, redux: { entertainment, loadEntertainment } } = this.props

    return (
      <Load load={loadEntertainment} className={classes.root}>
        {entertainment && (
          <div className={classes.root}>
            <Helmet>
              <title>Partymaker - {entertainment.title}</title>
            </Helmet>
            <EntertainmentHeader title={entertainment.title} />
            <section className={classes.container}>
              <PlacesList
                className={classes.places}
                places={entertainment.places}
                onSelect={this.selectPlace}
              />
            </section>
            <aside>
              <Route
                path="/entertainments/:entertainment_id/places/:id"
                component={EntertainmentPlaceScene}
              />
            </aside>
          </div>
        )}
      </Load>
    )
  }
}

EntertainmentScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  redux: shape({
    entertainment: entertainmentShape,
    loadEntertainment: func,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  entertainment: select.entertainments.current(state, id),
  loadEntertainment: () => actions.entertainments.load(id)
})

export default withStyles(styles)(connect(redux)(EntertainmentScene))
