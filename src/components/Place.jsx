import React, { Component } from 'react'
import { node, object, shape, func } from 'prop-types'
import { List, ListItemText, Typography, withStyles } from '@material-ui/core'
import {
  CommentListItem,
  PhotosSlider,
  PlaceContacts,
  RatingStatusItem,
  StatusItem,
  PlaceTitle,
  CommentForm,
  ChatBody
} from 'components'
import isEmpty from 'lodash/isEmpty'
import Rating from '@material-ui/lab/Rating'
import { placeShape } from 'shapes'
import wait from 'utils/wait'
import { connect, actions } from 'src/redux'

const styles = () => ({
  root: {
    flex: 1,
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
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column'
  },

  commentsTitle: {
    fontFamily: 'Google Sans',
    padding: '0 20px',
  },

  contactsTitle: {
    fontFamily: 'Google Sans',
  },

  chatBody: {
    background: 'transparent'
  }
})

class Place extends Component {

  chatBody = React.createRef()

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
    const action = await createComment(place.id, form)
    this.scrollBottom()
    return action
  }

  scrollBottom = () =>
    this.chatBody.current.scrollToBottom()

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

        {place.comments && (
          <div className={classes.comments}>
            <Typography variant="subtitle1" className={classes.commentsTitle}>
              Комментарии
            </Typography>
            <ChatBody className={classes.chatBody} ref={this.chatBody}>
              <List>
                {place.comments.map(comment => <CommentListItem key={comment.id} comment={comment} />)}
              </List>
            </ChatBody>
            <CommentForm onSubmit={this.comment} />
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
  redux: shape({
    createComment: func.isRequired,
  })
}

const redux = () => ({
  createComment: actions.places.comments.create,
})

export default withStyles(styles)(connect(redux)(Place))
