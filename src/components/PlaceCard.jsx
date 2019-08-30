import React, { Component } from 'react'
import { object, func, string } from 'prop-types'
import { Typography, withStyles, Button } from '@material-ui/core'
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
    cursor: 'pointer',
    width: '100%',
    height: 177,
    backgroundImage: (p) => `url(${p.place.picture_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0,0,0,0.12)',
  },

  title: {
    cursor: 'pointer',
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
    isLoading: false
  }

  iWantHere = async () => {
    const { place, onSelect } = this.props
    this.setState({ isLoading: true, })
    await onSelect(place)
    this.setState({ isLoading: false, })
  }

  render() {
    const { classes, place, buttonTitle } = this.props
    const { isLoading } = this.state

    return (
      <div className={classes.root}>
        <Picture
          src={place.picture_url}
          className={classes.picture}
          onClick={this.iWantHere}
        />
        <div className={classes.container}>
          <Typography
            className={classes.title}
            onClick={this.iWantHere}
          >
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
          <Button
            disabled={isLoading}
            variant="outlined"
            color="primary"
            onClick={this.iWantHere}
          >
            {isLoading ? 'Загрузка...' : buttonTitle}
          </Button>
        </div>
      </div>
    )
  }
}

PlaceCard.propTypes = {
  classes: object.isRequired,
  place: placeShape.isRequired,
  onSelect: func.isRequired,
  buttonTitle: string,
}
PlaceCard.defaultProps = {
  buttonTitle: 'ХОЧУ СЮДА'
}

export default withStyles(styles)(PlaceCard)
