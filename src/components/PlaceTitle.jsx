import React from 'react'
import { func, object, bool, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture } from 'components'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  picture: {
    width: '90px',
    height: 50,
    marginRight: 5,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  largerPicture: {
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
  },
  subtitle: {
    opacity: 0.8,
  },
  price: {
    color: '#07522C',
  }
})

const PlaceTitle = ({ classes, className, place, full, onClick }) =>
  <div className={classNames(classes.root, className)}>
    <Picture
      src={place?.picture_url}
      className={classNames({
        [classes.picture]: true,
        [classes.largerPicture]: full,
      })}
      onClick={onClick}
    />
    <div className={classes.container}>
      <Typography gutterBottom className={classes.title} onClick={onClick}>
        {place?.title || 'Выбрать место'}
      </Typography>
      <Typography gutterBottom variant="caption" className={classes.subtitle}>
        {place?.price || 'Место еще не выбрано'}
      </Typography>
      {full && (
        <Typography gutterBottom variant="caption" className={classes.subtitle}>
          {place?.working_hours}
        </Typography>
      )}
    </div>
  </div>

PlaceTitle.propTypes = {
  classes: object.isRequired,
  className: string,
  full: bool,
  place: placeShape,
  onClick: func,
}

export default withStyles(styles)(PlaceTitle)
