import React from 'react'
import { node, object } from 'prop-types'
import { Button, Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture } from 'components'

const styles = {
  root: {
    margin: 15,
    width: 344,
    border: '1px solid rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column'
  },
  picture: {
    width: '100%',
    height: 177,
    backgroundImage: (p) => `url(${p.place.picture_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0,0,0,0.12)',
  },

  title: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  secondaryButton: {
    color: 'rgba(0,0,0,0.54)'
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
  },
  secondaryActions: {
    flex: 1
  }
}

const PlaceCard = ({ classes, place, action }) =>
  <div className={classes.root}>
    <Picture src={place.picture_url} className={classes.picture} />
    <div className={classes.container}>
      <Typography className={classes.title}>
        {place.title}
      </Typography>
      <Typography color="textSecondary">
        {place.working_hours}
      </Typography>
    </div>
    <div className={classes.actions}>
      <div className={classes.secondaryActions}>
        <a target="_blank" href={place.website_url}>
          <Button className={classes.secondaryButton}>САЙТ</Button>
        </a>
        <a target="_blank" href={place.map_url}>
          <Button className={classes.secondaryButton}>КАРТА</Button>
        </a>
      </div>
      {action}
    </div>
  </div>

PlaceCard.propTypes = {
  classes: object.isRequired,
  place: placeShape.isRequired,
  action: node,
}

export default withStyles(styles)(PlaceCard)
