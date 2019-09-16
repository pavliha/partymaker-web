import React, { Component } from 'react'
import { node, object } from 'prop-types'
import { Button, Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture, PlaceDialog } from 'components'

const styles = {
  root: {
    position: 'relative',
    margin: 15,
    width: 344,
    border: '1px solid rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column'
  },
  picture: {
    width: '100%',
    height: 177,
  },

  price: {
    position: 'absolute',
    right: 0,
    top: 5,
    color: 'rgba(255,255,255,0.9)',
    padding: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.6)'
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

class PlaceCard extends Component {

  state = {
    isDialogOpen: false,
  }

  show = () =>
    this.setState({ isDialogOpen: true })

  hide = () =>
    this.setState({ isDialogOpen: false })

  select = () => {

  }

  render() {
    const { classes, place, action } = this.props
    const { isDialogOpen } = this.state
    return (
      <div className={classes.root}>
        <Picture src={place.picture_url} className={classes.picture} onClick={this.show} />
        <Typography color="inherit" className={classes.price}>
          {place.price}
        </Typography>
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
        <PlaceDialog
          place={place}
          isOpen={isDialogOpen}
          action={action}
          onClose={this.hide}
        />
      </div>
    )
  }
}

PlaceCard.propTypes = {
  classes: object.isRequired,
  place: placeShape.isRequired,
  action: node,
}

export default withStyles(styles)(PlaceCard)
