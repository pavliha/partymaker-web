import React, { Component } from 'react'
import { func, object, shape } from 'prop-types'
import placeShape from 'shapes/place'
import Rating from '@material-ui/lab/Rating'
import isEmpty from 'lodash/isEmpty'
import { withStyles, Button, ListItemText, Typography, List } from '@material-ui/core'
import { DefaultHeader, StatusItem, PlaceContact, CommentListItem, PhotosSlider, RatingStatusItem } from 'components'
import PlaceTitle from 'components/PlaceTitle'
import Load from 'components/Load'
import { select, connect, actions } from 'src/redux'
import GlobeIcon from 'mdi-react/GlobeIcon'
import InstagramIcon from 'mdi-react/InstagramIcon'
import PhoneIcon from 'mdi-react/PhoneIcon'
import MailIcon from 'mdi-react/MailIcon'
import LocationOnIcon from 'mdi-react/LocationOnIcon'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },

  container: {
    flex: 1,
    maxWidth: 820,
    paddingTop: 40,
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
    }
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
    marginBottom: 30,
  },

  comments: {
    fontFamily: 'Google Sans',
  },

  commentsTitle: {
    padding: '0 15px',
  }
})

class PlaceScene extends Component {
  render() {
    let { classes, redux: { place, loadPlace } } = this.props

    return (
      <Load promise={loadPlace}>
        {place && (
          <section className={classes.root}>
            <DefaultHeader />
            <div className={classes.container}>
              <PlaceTitle className={classes.placeTitle} full place={place} />
              <div className={classes.status}>
                <RatingStatusItem rating={place.rating} rating_count={place.rating_count} />
                <StatusItem
                  primary={'14+'}
                  secondary="возраст"
                />
                <StatusItem
                  primary={place.order_count}
                  secondary="заказов"
                />
              </div>

              <div className={classes.actions}>
                <Button color="primary" variant="contained">Собрать компанию</Button>
                <Button>Заказать</Button>
              </div>

              {!isEmpty(place.photos) && <PhotosSlider photos={place.photos} />}

              <div className={classes.rating}>
                <ListItemText
                  primary="Оцените заведение"
                  secondary={<Rating readOnly size="large" value={place.rating} />}
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

              {place.description && (
                <div className={classes.description}>
                  <Typography gutterBottom variant="subtitle1">Описание</Typography>
                  <Typography variant="caption">
                    {place.description}
                  </Typography>
                </div>
              )}

              {place.comments && (
                <div className={classes.comments}>
                  <Typography variant="subtitle1" className={classes.commentsTitle}>
                    Комментарии
                  </Typography>
                  <List>
                    {place.comments.map(comment => <CommentListItem key={comment.id} comment={comment} />)}
                  </List>
                </div>
              )}
            </div>
          </section>
        )}
      </Load>
    )
  }
}

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
