import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  picture: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    width: '90px',
    height: 50,
    borderRadius: 3,
    marginRight: 5,
  },
  title: {
    fontSize: 18,
  }
}

const ChoosePlaceTitle = ({ classes }) =>
  <div className={classes.root}>
    <div className={classes.picture} />
    <div>
      <Typography className={classes.title}>Выбрать место</Typography>
      <Typography color="textSecondary" variant="caption">Место еще не выбрано</Typography>
    </div>
  </div>

ChoosePlaceTitle.propTypes = {
  classes: object.isRequired,
  place: placeShape,
}

export default withStyles(styles)(ChoosePlaceTitle)
