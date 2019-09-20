import React, { Fragment } from 'react'
import { func, object, shape } from 'prop-types'
import placeShape from 'shapes/place'
import Rating from '@material-ui/lab/Rating'
import { withStyles, Button, ListItemText, Typography } from '@material-ui/core'
import { PlaceTitle, Load, DefaultHeader, StatusItem, PlaceContact } from 'components'
import { select, connect, actions } from 'src/redux'
import StarIcon from 'mdi-react/StarIcon'
import GlobeIcon from 'mdi-react/GlobeIcon'
import InstagramIcon from 'mdi-react/InstagramIcon'
import PhoneIcon from 'mdi-react/PhoneIcon'
import MailIcon from 'mdi-react/MailIcon'
import LocationOnIcon from 'mdi-react/LocationOnIcon'

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },

  container: {
    margin: '0 auto',
    maxWidth: 820,
    paddingTop: 40,
  },

  placeTitle: {
    fontFamily: 'Google Sans',
    paddingLeft: 20,
    paddingBottom: 30,
    paddingRight: 5,
  },

  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: 375,
    paddingBottom: 40,
  },

  status: {
    paddingBottom: 30,
    display: 'flex',
  },

  photos: {
    display: 'flex',
    overflow: 'scroll',
    height: 120,
  },

  photo: {
    width: 200,
    minWidth: 200,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
    '&:first-child': {
      marginLeft: 10,
    },
  },

  rating: {
    fontFamily: 'Google Sans',
    padding: '20px 15px'
  },

  contacts: {
    fontFamily: 'Google Sans',
    padding: '0 15px',
    marginBottom: 30,
  },

  description: {
    fontFamily: 'Google Sans',
    padding: '0 15px',
  }
})

const PlaceScene = ({ classes, redux: { place, loadPlace } }) =>
  <Load promise={loadPlace}>
    {place && (
      <section className={classes.root}>
        <DefaultHeader />
        <div className={classes.container}>
          <PlaceTitle className={classes.placeTitle} full place={place} />
          <div className={classes.status}>
            <StatusItem
              primary={(
                <Fragment>
                  <div>4.8</div>
                  <StarIcon style={{ width: 15, height: 15 }} />
                </Fragment>
              )}
              secondary="7 отзывов"
            />
            <StatusItem
              primary={'12+'}
              secondary="возраст"
            />
            <StatusItem
              primary={'5'}
              secondary="посещений"
            />
          </div>
          <div className={classes.actions}>
            <Button color="primary" variant="contained">Собрать компанию</Button>
            <Button>Заказать</Button>
          </div>
          <div className={classes.photos}>
            <img alt={place.title} src={place.picture_url} className={classes.photo} />
            <img alt={place.title} src={place.picture_url} className={classes.photo} />
            <img alt={place.title} src={place.picture_url} className={classes.photo} />
            <img alt={place.title} src={place.picture_url} className={classes.photo} />
            <img alt={place.title} src={place.picture_url} className={classes.photo} />
          </div>
          <div className={classes.rating}>
            <ListItemText
              primary="Оцените заведение"
              secondary={<Rating readOnly size="large" value={5} />}
            />
          </div>
          <div className={classes.contacts}>
            <Typography gutterBottom variant="subtitle1">Контакты</Typography>
            {place.website_url && (
              <a target="_blank" href={place.website_url}>
                <PlaceContact icon={GlobeIcon} label="Website" />
              </a>
            )}
            {place.email && (<PlaceContact icon={MailIcon} label={place.email} />)}
            {place.instagram_url && (
              <a target="_blank" href={place.instagram_url}>
                <PlaceContact icon={InstagramIcon} label={place.instagram_url} />
              </a>
            )}
            {place.phone && <PlaceContact icon={PhoneIcon} label={place.phone} />}
            {place.address && <PlaceContact icon={LocationOnIcon} label={place.address} />}
          </div>
          <div className={classes.description}>
            <Typography gutterBottom variant="subtitle1">Описание</Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
          </div>
        </div>
      </section>
    )}
  </Load>

PlaceScene.propTypes = {
  classes: object.isRequired,
  redux: shape({
    place: placeShape,
    loadPlace: func.isRequired,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  place: select.places.current(state, id),
  loadPlace: () => actions.places.load(id)
})

export default withStyles(styles)(connect(redux)(PlaceScene))
