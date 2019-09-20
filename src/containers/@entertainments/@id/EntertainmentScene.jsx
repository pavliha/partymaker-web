import React from 'react'
import { object, shape, func } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { userShape, entertainmentShape } from 'shapes'
import { AppBottomNavigation, PlacesList, BackButton, AccountDropdown, Load, Header } from 'components'
import { actions, connect, select } from 'src/redux'
import { Helmet } from 'react-helmet'

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

  title: {
    cursor: 'pointer',
    paddingLeft: 5,
    fontSize: 18,
    flex: 1,
  },

  places: {
    flexWrap: 'wrap',
  }
})

const EntertainmentScene = ({ classes, history, redux: { entertainment, loadEntertainment } }) =>
  <Load promise={loadEntertainment} className={classes.root}>
    {entertainment && (
      <div className={classes.root}>
        <Helmet>
          <title>Partymaker - {entertainment.title}</title>
        </Helmet>
        <Header>
          <BackButton onClick={() => history.push('/entertainments')} />
          <Typography component="div" className={classes.title}>
            {entertainment.title}
          </Typography>
          <AccountDropdown />
        </Header>
        <section className={classes.container}>
          <PlacesList className={classes.places} places={entertainment.places} />
        </section>
        <AppBottomNavigation />
      </div>
    )}
  </Load>

EntertainmentScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  redux: shape({
    user: userShape,
    entertainment: entertainmentShape,
    loadEntertainment: func,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  user: select.auth.user(state),
  entertainment: select.entertainments.current(state, id),
  loadEntertainment: () => actions.entertainments.load(id)
})

export default withStyles(styles)(connect(redux)(EntertainmentScene))
