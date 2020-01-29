import React from 'react'
import classNames from 'classnames'
import { object, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { placeShape } from 'shapes'
import isEmpty from 'lodash/isEmpty'
import { convertFromRaw, Editor, EditorState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import useTheme from '@material-ui/core/styles/useTheme'

import {
  AdditionalServicesList,
  Contacts,
  PhotosList,
  PlaceActions,
  PlaceHeader,
  PlaceStatus,
  PlaceSubtitle,
  PricesList
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

const getDescription = (description) => {
  try {
    return EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
  } catch (e) {
    return EditorState.createWithContent(stateFromHTML(description))
  }
}

const Place = ({ classes, className, place }) => {
  const theme = useTheme()

  const styleMap = {
    'TITLE': theme.typography.h5,
    'SUBTITLE': theme.typography.subtitle2,
    'BODY': theme.typography.body1,
  }

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
            <Editor
              customStyleMap={styleMap}
              editorState={getDescription(place.description)}
              readOnly
            />
          </div>
        )}
      </section>
    </section>
  )
}

Place.propTypes = {
  classes: object.isRequired,
  className: string,
  place: placeShape,
}
export default withStyles(styles)(Place)
