import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { priceShape } from 'shapes'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Google Sans,sans-serif',
    margin: '15px 0'
  },

  title: {
    fontFamily: 'Google Sans,sans-serif',
    fontSize: 16,
  },

  cost: {
    fontSize: 18,
  }
}

const PriceListItem = ({ classes, price }) =>
  <div className={classes.root}>
    <Typography className={classes.title}>{price.title}</Typography>
    <Typography className={classes.cost}>{price.cost} грн</Typography>
  </div>

PriceListItem.propTypes = {
  classes: object.isRequired,
  price: priceShape,
}

export default withStyles(styles)(PriceListItem)
