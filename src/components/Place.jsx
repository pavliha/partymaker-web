import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { node, object, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { PhotosList, Contacts, PlaceStatus, PlaceSubtitle, PlaceHeader, PricesList } from 'components'
import { placeShape } from 'shapes'

const styles = {
  root: {
    margin: '0 auto',
    flex: 1,
    maxWidth: 900,
    width: '100%',
    paddingTop: 20,
  },

  actions: {
    display: 'flex',
    paddingBottom: 60,
  },

  status: {
    paddingBottom: 30,
    display: 'flex',
  },

  container: {
    padding: '0 20px',
  },

  photosList: {
    marginBottom: 30,
  },

  contacts: {
    fontFamily: 'Google Sans, Arial, sans-serif',
    marginBottom: 30,
  },

  prices: {
    fontFamily: 'Google Sans, Arial, sans-serif',
    marginBottom: 30,
  },

  description: {
    fontSize: 18,
    fontFamily: 'Google Sans, Arial, sans-serif',
    fontWeight: 500,
    marginBottom: 30,
  },

  descriptionText: {
    fontSize: 17,
  },
}

class Place extends PureComponent {

  componentDidMount() {
    window.scrollTo({ top: 0 })
  }

  render() {
    const { classes, className, place, actions } = this.props

    return (
      <section className={classNames(classes.root, className)}>
        <PlaceHeader place={place} />
        <PlaceStatus className={classes.status} place={place} />
        <section className={classes.container}>
          <div className={classes.actions}>
            {actions}
          </div>
          <PhotosList
            className={classes.photosList}
            photos={place.photos}
          />
          {place.prices && (
            <div className={classes.prices}>
              <PlaceSubtitle>Цены</PlaceSubtitle>
              <PricesList prices={place.prices} />
              <Typography color="textSecondary">{place.about_prices}</Typography>
            </div>
          )}
          {place.contacts && (
            <div className={classes.contacts}>
              <PlaceSubtitle>Контакты</PlaceSubtitle>
              <Contacts contacts={place.contacts} />
            </div>
          )}
          {place.description && (
            <div className={classes.description}>
              <Typography
                className={classes.descriptionText}
                dangerouslySetInnerHTML={{ __html: place.description }}
              />
            </div>
          )}
        </section>
      </section>
    )
  }
}

Place.propTypes = {
  classes: object.isRequired,
  className: string,
  place: placeShape,
  actions: node,
}
export default withStyles(styles)(Place)
