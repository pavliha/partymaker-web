import React, { Component } from 'react'
import { node, object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture, PlaceDialog } from 'components'

const styles = {
  root: {
    position: 'relative',
    margin: 15,
    width: 150,
    display: 'flex',
    flexDirection: 'column'
  },
  picture: {
    cursor: 'pointer',
    width: 150,
    height: 150,
  },

  title: {
    cursor: 'pointer',
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 5,
  },
  secondaryButton: {
    color: 'rgba(0,0,0,0.54)'
  },
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
        <div className={classes.container}>
          <Typography className={classes.title} onClick={this.show}>
            {place.title}
          </Typography>
          <Typography color="textSecondary">
            {place.price}
          </Typography>
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
