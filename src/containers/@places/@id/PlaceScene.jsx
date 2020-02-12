import React, { Fragment } from 'react'
import { object, shape, string } from 'prop-types'
import { Place, PlaceLoader } from 'components'
import { Helmet } from 'react-helmet'
import placeShape from 'shapes/place'
import { withStyles } from '@material-ui/styles'
import { connect, select } from 'src/redux'

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
  },

  place: {
    paddingTop: 20,
    boxSizing: 'border-box',
    flex: 1,
    overflow: 'scroll',
    maxWidth: 450,
    width: '100%',
    height: '100vh',
  },

  iframe: {
    height: '99vh',
    flex: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }

  },
})

const PlaceScene = ({ match, classes, redux: { place } }) =>
  <div className={classes.root}>
    <div className={classes.container}>
      <PlaceLoader id={match.params.id}>
        {place && (
          <Helmet>
            <title>{place.title} - Partymaker</title>
            <meta
              name="description"
              content={place.description}
            />
          </Helmet>
        )}
        {place && (
          <Fragment>
            <Place className={classes.place} place={place} />
            <iframe className={classes.iframe} frameBorder={0} src={place?.contacts?.website_url} />
          </Fragment>
        )}
      </PlaceLoader>
    </div>
  </div>

PlaceScene.propTypes = {
  classes: object.isRequired,
  match: shape({ params: shape({ id: string }) }),
  redux: shape({
    place: placeShape,
  }),
}

const redux = (state, { match }) => ({
  place: select.places.current(state, match.params.id),
})

export default withStyles(styles)(connect(redux)(PlaceScene))
