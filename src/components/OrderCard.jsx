import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import FieldLabel from 'components/Label'
import orderShape from 'shapes/order'

const styles = {
  root: {},
}

const OrderCard = ({ classes, order }) =>
  <div className={classes.root}>
    <FieldLabel title="Дата">
      <Typography>{order.date}</Typography>
    </FieldLabel>
    <FieldLabel title="Время">
      <Typography>{order.time}</Typography>
    </FieldLabel>
    <FieldLabel title="Кол-во человек">
      <Typography>{order.guests}</Typography>
    </FieldLabel>
    <FieldLabel title="Контактный телефон">
      <Typography>{order.phone}</Typography>
    </FieldLabel>
  </div>

OrderCard.propTypes = {
  classes: object.isRequired,
  order: orderShape.isRequired
}

export default withStyles(styles)(OrderCard)
