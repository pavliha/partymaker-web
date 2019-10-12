import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { entertainmentShape } from 'shapes'
import { PlacesList, Loader, EntertainmentHeader } from 'components'
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
    flex: 1,
    paddingTop: 35,
    overflow: 'auto',
    display: 'inline-block',
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
    history.push(`/places/${place.id}`)
  }

  render() {
    const { classes, redux: { entertainment, loadEntertainment } } = this.props

    return (
      <Loader load={loadEntertainment}>
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
          </div>
        )}
      </Loader>
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
