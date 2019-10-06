import React, { Component } from 'react'
import { node, object, shape, func, string } from 'prop-types'
import { ListItemText, Typography, withStyles } from '@material-ui/core'
import { PhotosSlider, PlaceContacts, RatingStatusItem, StatusItem, PlaceTitle, Comments } from 'components'
import isEmpty from 'lodash/isEmpty'
import Rating from '@material-ui/lab/Rating'
import { placeShape, userShape } from 'shapes'
import wait from 'utils/wait'
import { connect, actions, select } from 'src/redux'
import classNames from 'classnames'

const styles = () => ({
  root: {
    flex: 1,
    maxWidth: 820,
    width: '100%',
    paddingTop: 20,
  },

  placeTitle: {
    fontFamily: 'Google Sans',
    paddingLeft: 20,
    paddingBottom: 30,
    paddingRight: 5,
  },

  actions: {
    paddingLeft: 20,
    display: 'flex',
    paddingBottom: 30,
  },

  status: {
    paddingBottom: 30,
    display: 'flex',
  },

  rating: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Google Sans',
    padding: '20px 20px'
  },

  contacts: {
    fontFamily: 'Google Sans',
    padding: '0 20px',
    marginBottom: 30,
  },

  description: {
    fontFamily: 'Google Sans',
    padding: '0 20px',
    marginBottom: 30,
  },

  contactsTitle: {
    fontFamily: 'Google Sans',
  },

})

class Place extends Component {

  state = {
    rated: null,
    rateTimeout: false,
  }

  ratePlace = async (e, value) => {
    this.setState({ rated: value, rateTimeout: true })

    await wait(3000)
    this.setState({ rateTimeout: false })
  }

  comment = async (form) => {
    const { place, redux: { createComment } } = this.props
    return createComment(place.id, form)
  }

  render() {
    const { classes, className, place, actions, redux: { auth } } = this.props
    const { rated, rateTimeout } = this.state

    return (
      <div className={classNames(classes.root, className)}>
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
          {actions}
        </div>

        {!isEmpty(place.photos) && <PhotosSlider photos={place.photos} />}

        <div className={classes.rating}>
          <ListItemText
            primary="Оцените заведение"
            secondary={(
              <Rating
                color={rated ? 'primary' : 'default'}
                name="rating"
                size="large"
                value={rated || place.rating}
                onChange={this.ratePlace}
              />
            )}
          />
          {rateTimeout && <Typography variant="caption">Ваш рейтинг сохранен!</Typography>}
        </div>

        <div className={classes.contacts}>
          <Typography className={classes.contactsTitle} gutterBottom variant="subtitle1">Контакты</Typography>
          {place.contacts && <PlaceContacts contacts={place.contacts} />}
        </div>

        {place.description && (
          <div className={classes.description}>
            <Typography gutterBottom variant="subtitle1">Описание</Typography>
            <Typography variant="caption">
              {place.description}
            </Typography>
          </div>
        )}
        <Comments
          user={auth}
          comments={place.comments}
          onComment={this.comment}
        />
      </div>
    )
  }
}

Place.propTypes = {
  classes: object.isRequired,
  className: string,
  place: placeShape,
  actions: node,
  redux: shape({
    auth: userShape,
    createComment: func.isRequired,
  })
}

const redux = state => ({
  auth: select.auth.user(state),
  createComment: actions.places.comments.create,
})

export default withStyles(styles)(connect(redux)(Place))
