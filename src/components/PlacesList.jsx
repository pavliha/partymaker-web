import React from 'react'
import { arrayOf, object, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
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

const PlacesList = ({ classes, className, places, onSelect }) =>
  <div className={classNames([className, classes.root])}>
    {places.map(place =>
      <PlaceCard
        key={place.id}
        place={place}
        onSelect={onSelect}
      />
    )}
  </div>

PlacesList.propTypes = {
  classes: object.isRequired,
  className: string,
  places: arrayOf(placeShape).isRequired,
  onSelect: func.isRequired,
}

export default withStyles(styles)(PlacesList)
