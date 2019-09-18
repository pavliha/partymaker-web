import React from 'react'
import { object, shape, func } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { userShape, entertainmentShape } from 'shapes'
import { AppBottomNavigation, ProfileHeader, PlacesList, BackButton } from 'components'
import { actions, connect, select } from 'src/redux'
import { Helmet } from 'react-helmet'
import Load from 'components/Load'

const styles = () => ({
  root: {},
  container: {
    maxWidth: 960,
    margin: '0 auto',
    paddingRight: 15,
    paddingLeft: 15,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
  },

  title: {
    paddingTop: 25,
    paddingBottom: 25,
    cursor: 'pointer',
    fontSize: 20,
  },
  places: {
    flexWrap: 'wrap',
  }
})

const EntertainmentsScene = ({ classes, history, redux: { user, entertainment, loadEntertainment } }) =>
  <Load promise={loadEntertainment} className={classes.root}>
    {entertainment && (
      <div className={classes.root}>
        <Helmet>
          <title>Partymaker - {entertainment.title}</title>
        </Helmet>
        <ProfileHeader user={user} />
        <section className={classes.container}>
          <header className={classes.header}>
            <BackButton onClick={() => history.push('/entertainments')} />
            <Typography component="div" className={classes.title}>
              {entertainment.title}
            </Typography>
          </header>
          <PlacesList className={classes.places} places={entertainment.places} />
        </section>
        <AppBottomNavigation />
      </div>
    )}
  </Load>

EntertainmentsScene.propTypes = {
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

export default withStyles(styles)(connect(redux)(EntertainmentsScene))
