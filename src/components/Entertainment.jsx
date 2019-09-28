import React from 'react'
import { object, func } from 'prop-types'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import KeyboardArrowRightIcon from 'mdi-react/ArrowRightIcon'
import { Link } from 'react-router-dom'
import { entertainmentShape } from 'shapes'
import { PlacesList } from 'components'

const styles = () => ({
  root: {
    marginBottom: 25,
  },

  expand: {
    display: 'flex',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    cursor: 'pointer',
    paddingLeft: 5,
    fontSize: 20,
  },

  places: {
    overflow: 'auto',
  }

})

const Entertainment = ({ classes, entertainment, onSelectPlace }) =>
  <div className={classes.root}>
    <Link
      to={`/entertainments/${entertainment.id}`}
      component="div"
      className={classes.expand}
    >
      <Typography component="div" className={classes.title}>
        {entertainment.title}
      </Typography>
      <IconButton>
        <KeyboardArrowRightIcon />
      </IconButton>
    </Link>
    {entertainment.places && (
      <PlacesList
        className={classes.places}
        places={entertainment.places}
        onSelect={onSelectPlace}
      />
    )}
  </div>

Entertainment.propTypes = {
  classes: object.isRequired,
  entertainment: entertainmentShape.isRequired,
  onSelectPlace: func,
}

export default withStyles(styles)(Entertainment)
