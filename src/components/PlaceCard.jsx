import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture } from 'components'

const styles = {
  root: {
    cursor: 'pointer',
    position: 'relative',
    margin: 10,
    width: 150,
    display: 'flex',
    flexDirection: 'column'
  },
  picture: {
    borderRadius: 25,
    width: 150,
    height: 150,
  },

  title: {
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

  select = () => {
    const { place, onSelect } = this.props
    onSelect(place)
  }

  render() {
    const { classes, place } = this.props

    return (
      <div className={classes.root} onClick={this.select}>
        <Picture src={place.picture_url} className={classes.picture} />
        <div className={classes.container}>
          <Typography className={classes.title}>{place.title}</Typography>
          <Typography color="textSecondary">{place.price}</Typography>
        </div>
      </div>
    )
  }
}

PlaceCard.propTypes = {
  classes: object.isRequired,
  place: placeShape.isRequired,
  onSelect: func,
}

PlaceCard.defaultProps = {
  onSelect: () => {}
}

export default withStyles(styles)(PlaceCard)
