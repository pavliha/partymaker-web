import React, { Fragment } from 'react'
import { object, shape, string } from 'prop-types'
import { Place, PlaceLoader } from 'components'
import { Helmet } from 'react-helmet'
import placeShape from 'shapes/place'
import { withStyles } from '@material-ui/styles'
import { connect, select } from 'src/redux'
import { isHttps } from 'src/utils'
import c from 'classnames'

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
    width: '100%',
    height: '100vh',
    maxWidth: 800,
    margin: ' 0 auto',
    overflow: 'visible',
  },

  iframe: {
    height: '99vh',
    flex: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },

  slideLeft: {
    overflow: 'scroll',
    margin: 0,
    maxWidth: 500,
  }
})

const PlaceScene = ({ match, classes, redux: { place } }) => {
  const website_url = place?.contacts?.website_url
  const hasHttps = isHttps(website_url)
  const placeStyle = c(classes.place, { [classes.slideLeft]: hasHttps })

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <PlaceLoader id={match.params.id}>
          {place && (
            <Helmet>
              <title>{place.title} - Partymaker</title>
              <meta name="description" content={place.description} />
            </Helmet>
          )}
          {place && (
            <Fragment>
              <Place
                className={placeStyle}
                place={place}
              />
              {hasHttps && <iframe className={classes.iframe} frameBorder={0} src={website_url} />}
            </Fragment>
          )}
        </PlaceLoader>
      </div>
    </div>
  )
}

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
