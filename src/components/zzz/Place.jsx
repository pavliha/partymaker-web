import React, { Component } from 'react'
import { node, object, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { PhotosSlider, PlaceContacts, PlaceStatus, BackButton, ShareButton, PlaceCard } from 'components'
import isEmpty from 'lodash/isEmpty'
import { placeShape } from 'shapes'
import classNames from 'classnames'

const styles = () => ({
  root: {
    margin: '0 auto',
    flex: 1,
    maxWidth: 900,
    width: '100%',
    paddingTop: 20,
  },

  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingRight: 5,
    paddingLeft: 5,
  },

  place: {
    display: 'flex',
    alignItems: 'center',
  },

  placeTitle: {
    fontFamily: 'Google Sans',
    paddingRight: 5,
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

  slider: {
    marginBottom: 30,
  },

  contacts: {
    fontFamily: 'Google Sans',
    marginBottom: 30,
  },

  description: {
    fontFamily: 'Google Sans',
    marginBottom: 30,
  },

  contactsTitle: {
    fontFamily: 'Google Sans',
  },

  descriptionText: {
    fontSize: 17,
  },
})

class Place extends Component {

  componentDidMount() {
    window.scrollTo({ top: 0 })
  }

  shareApi = async () => {
    const { place } = this.props

    let url = document.location.href
    const canonicalElement = document.querySelector('link[rel=canonical]')

    if (canonicalElement !== null) {
      url = canonicalElement.href
    }

    if (navigator.share) {
      await navigator.share({
        url,
        text: place.title,
        title: place.title,
      })
    }
  }

  render() {
    const { classes, className, place, actions } = this.props

    return (
      <section className={classNames(classes.root, className)}>
        <div className={classes.flex}>
          <div className={classes.place}>
            <BackButton />
            <PlaceCard
              className={classes.placeTitle}
              inline
              place={place}
            />
          </div>
          <ShareButton onClick={this.shareApi} />
        </div>

        <PlaceStatus
          className={classes.status}
          place={place}
        />

        <section className={classes.container}>
          <div className={classes.actions}>
            {actions}
          </div>
          {!isEmpty(place.photos) && (
            <PhotosSlider
              className={classes.slider}
              photos={place.photos}
            />
          )}
          <div className={classes.contacts}>
            <Typography
              className={classes.contactsTitle}
              gutterBottom
              variant="subtitle1"
            >
              Контакты
            </Typography>
            {place.contacts && (
              <PlaceContacts contacts={place.contacts} />
            )}
          </div>

          {place.description && (
            <div className={classes.description}>
              <Typography
                gutterBottom
                variant="subtitle1"
              >
                Описание
              </Typography>
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
