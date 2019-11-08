import React, { Component } from 'react'
import { node, object, string } from 'prop-types'
import { ListItemText, Typography, withStyles } from '@material-ui/core'
import { PhotosSlider, PlaceContacts, PlaceStatus, BackButton, PlaceCard } from 'components'
import isEmpty from 'lodash/isEmpty'
import Rating from '@material-ui/lab/Rating'
import { placeShape } from 'shapes'
import wait from 'utils/wait'
import classNames from 'classnames'

const styles = () => ({
  root: {
    flex: 1,
    maxWidth: 900,
    width: '100%',
    paddingTop: 20,
  },

  place: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 30,
    paddingLeft: 5,
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

  rating: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Google Sans',
    padding: '20px 0'
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
  }
})

class Place extends Component {

  state = {
    rated: null,
    rateTimeout: false,
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      left: 100,
    })
  }

  ratePlace = async (e, value) => {
    this.setState({ rated: value, rateTimeout: true })

    await wait(3000)
    this.setState({ rateTimeout: false })
  }

  render() {
    const { classes, className, place, actions } = this.props
    const { rated, rateTimeout } = this.state

    return (
      <section className={classNames(classes.root, className)}>
        <div className={classes.place}>
          <BackButton />
          <PlaceCard className={classes.placeTitle} inline place={place} />
        </div>
        <PlaceStatus className={classes.status} place={place} />
        <section className={classes.container}>
          <div className={classes.actions}>{actions}</div>
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
              <Typography className={classes.descriptionText} dangerouslySetInnerHTML={{ __html: place.description }} />
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
