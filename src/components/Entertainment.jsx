import React from 'react'
import { object, func, string } from 'prop-types'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import KeyboardArrowRightIcon from 'mdi-react/ArrowRightIcon'
import { Link } from 'react-router-dom'
import { entertainmentShape } from 'shapes'
import { PlacesList } from 'components'
import Fuse from 'fuse.js'
import isEmpty from 'lodash/isEmpty'

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

const options = {
  keys: ['title']
}

const Entertainment = ({ classes, entertainment, search, onSelect }) => {

  const fuse = new Fuse(entertainment.places, options)
  const results = fuse.search(search || '')
  const array = isEmpty(results) ? entertainment.places : results

  return (
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
          places={array}
          onSelect={onSelect}
        />
      )}
    </div>
  )
}

Entertainment.propTypes = {
  classes: object.isRequired,
  search: string,
  entertainment: entertainmentShape.isRequired,
  onSelect: func,
}

export default withStyles(styles)(Entertainment)
