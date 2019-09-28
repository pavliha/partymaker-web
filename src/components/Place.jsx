import React, { Component } from 'react'
import { node, object } from 'prop-types'
import { List, ListItemText, Typography, withStyles } from '@material-ui/core'
import { CommentListItem, PhotosSlider, PlaceContacts, RatingStatusItem, StatusItem, PlaceTitle } from 'components'
import isEmpty from 'lodash/isEmpty'
import Rating from '@material-ui/lab/Rating'
import { placeShape } from 'shapes'
import wait from 'utils/wait'

const styles = () => ({
  root: {
    flex: 1,
    maxWidth: 820,
    paddingTop: 40,
    overflow: 'auto',
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
    paddingBottom: 15,
  },

  status: {
    paddingBottom: 30,
    display: 'flex',
  },

  rating: {
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

  comments: {
    fontFamily: 'Google Sans',
  },

  commentsTitle: {
    padding: '0 20px',
  }
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

  render() {
    const { classes, place, actions } = this.props
    const { rated, rateTimeout } = this.state

    return (
      <div className={classes.root}>
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
          <Typography gutterBottom variant="subtitle1">Контакты</Typography>
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
    )
  }
}

Place.propTypes = {
  classes: object.isRequired,
  place: placeShape,
  actions: node,
}

export default withStyles(styles)(Place)
