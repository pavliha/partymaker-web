import React from 'react'
import { arrayOf, object, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { PlaceCard } from 'components'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'flex-start'
    }
  },
})

const PlacesList = ({ classes, className, places }) =>
  <div className={classNames([className, classes.root])}>
    {places.map(place => <PlaceCard key={place.id} place={place} />)}
  </div>

PlacesList.propTypes = {
  classes: object.isRequired,
  className: string,
  places: arrayOf(placeShape).isRequired,
}

export default withStyles(styles)(PlacesList)
