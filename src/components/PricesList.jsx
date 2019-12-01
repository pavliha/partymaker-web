import React from 'react'
import { object, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { priceShape } from 'shapes'
import { PriceListItem } from 'components'

const styles = {
  root: {},
}

const PricesList = ({ classes, prices }) =>
  <div className={classes.root}>
    {prices.map(price => <PriceListItem price={price} />)}
  </div>

PricesList.propTypes = {
  classes: object.isRequired,
  prices: arrayOf(priceShape)
}

export default withStyles(styles)(PricesList)
