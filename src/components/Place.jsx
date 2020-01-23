import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { object, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { placeShape } from 'shapes'
import isEmpty from 'lodash/isEmpty'
import {
  PhotosList,
  Contacts,
  PlaceStatus,
  PlaceSubtitle,
  PlaceHeader,
  PricesList,
  AdditionalServicesList,
  PlaceActions
} from 'components'

const styles = {
  root: {},

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

  section: {
    fontFamily: 'Google Sans, Arial, sans-serif',
    marginBottom: 30,
  },

  photosList: {
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
    const { classes, className, place } = this.props

    return (
      <section className={classNames(classes.root, className)}>
        <PlaceHeader place={place} />
        {place.requirements && <PlaceStatus className={classes.status} requirements={place.requirements} />}
        <section className={classes.container}>
          <div className={classes.actions}>
            <PlaceActions
              phone={place.contacts?.phone}
              website_url={place.contacts?.website_url}
            />
          </div>
          <PhotosList
            className={classes.photosList}
            photos={place.photos}
          />
          {isEmpty(place.prices) || (
            <div className={classes.section}>
              <PlaceSubtitle>Цены</PlaceSubtitle>
              <PricesList prices={place.prices} />
              <Typography color="textSecondary">{place.about_prices}</Typography>
            </div>
          )}
          {isEmpty(place.additional_services) || (
            <div className={classes.section}>
              <PlaceSubtitle>Дополнительные услуги</PlaceSubtitle>
              <AdditionalServicesList additional_services={place.additional_services} />
            </div>
          )}
          {isEmpty(place.contacts) || (
            <div className={classes.section}>
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
}
export default withStyles(styles)(Place)
