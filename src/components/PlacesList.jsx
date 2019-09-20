import React from 'react'
import { arrayOf, object, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Link } from 'react-router-dom'
import { PlaceCard } from 'components'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 10px',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'flex-start'
    }
  },
})

const PlacesList = ({ classes, className, places }) =>
  <div className={classNames([className, classes.root])}>
    {places.map(place =>
      <Link key={place.id} to={`/places/${place.id}`} component="div">
        <PlaceCard place={place} />
      </Link>
    )}
  </div>

PlacesList.propTypes = {
  classes: object.isRequired,
  className: string,
  places: arrayOf(placeShape).isRequired,
}

export default withStyles(styles)(PlacesList)
