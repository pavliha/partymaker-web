import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { entertainmentShape } from 'shapes'
import { PlacesList, Load, EntertainmentHeader } from 'components'
import { actions, connect, select } from 'src/redux'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router-dom'
import EntertainmentPlaceScene from './@places/EntertainmentPlaceScene'

const styles = (theme) => ({

  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  container: {
    position: 'relative',
    display: 'flex',
  },

  header: {
    padding: '0 10px',
    height: 60,
    display: 'flex',
    alignItems: 'center',
  },

  places: {
    paddingTop: 35,
    flexWrap: 'wrap',
    flex: 1,
    overflow: 'auto',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: 30,
    }
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
    }
  }
})

class EntertainmentScene extends Component {

  selectPlace = place => {
    const { history, redux: { entertainment } } = this.props
    const { matches } = window.matchMedia('(max-width: 750px)')
    history.push(matches ? `/places/${place.id}` : `/entertainments/${entertainment.id}/places/${place.id}`)
  }

  render() {
    const { classes, redux: { entertainment, loadEntertainment } } = this.props

    return (
      <Load load={loadEntertainment}>
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
              <aside className={classes.aside}>
                <Route
                  path="/entertainments/:entertainment_id/places/:id"
                  component={EntertainmentPlaceScene}
                />
              </aside>
            </section>
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
