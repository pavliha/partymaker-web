import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { entertainmentShape } from 'shapes'
import { PlacesList, Load, EntertainmentHeader, PlaceAside } from 'components'
import { actions, connect, select } from 'src/redux'
import { Helmet } from 'react-helmet'

const styles = (theme) => ({

  root: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  container: {
    height: 'calc(100% - 64px)',
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

  state = {
    place_id: null,
  }

  selectPlace = place => {
    const { history } = this.props
    const { matches } = window.matchMedia('(max-width: 768px)')
    matches
      ? history.push(`/places/${place.id}`)
      : this.setState({ place_id: place.id })
  }

  render() {
    const { classes, redux: { entertainment, loadEntertainment } } = this.props
    const { place_id } = this.state

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
              <PlaceAside id={place_id || entertainment.places[0]?.id} />
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
