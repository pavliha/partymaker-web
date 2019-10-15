import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { entertainmentShape } from 'shapes'
import { PlacesList, Loader, LeftNavigation, BackButton } from 'components'
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
    position: 'relative',
    width: '100%',
    maxWidth: 1050,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: 300,
      width: 'calc(100% - 330px)',
    },
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

  leftNavigation: {
    position: 'fixed',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },

  title: {
    paddingLeft: 5,
    fontSize: 20,
  },

  heading: {
    marginLeft: 20,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
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
      <div>
        <Helmet>
          <title>Partymaker - {entertainment.title}</title>
        </Helmet>
        <LeftNavigation className={classes.leftNavigation} />
        <section className={classes.container}>
          <Loader load={loadEntertainment}> {entertainment && [
            <div className={classes.heading}>
              <BackButton />
              <Typography component="div" className={classes.title}>
                {entertainment.title}
              </Typography>
            </div>,
            <PlacesList
              className={classes.places}
              places={entertainment.places}
              onSelect={this.selectPlace}
            />
          ]}</Loader>
        </section>
      </div>
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
