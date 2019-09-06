import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { FieldLabel } from 'components'
import orderShape from 'shapes/order'
import moment from 'moment'

const styles = {
  root: {},
  actions: {}
}

const OrderCard = ({ classes, order }) =>
  <div className={classes.root}>
    <Typography gutterBottom variant="h5">У вас новый заказ</Typography>
    <FieldLabel title="Дата">
      <Typography>{moment(order.date).format('D MMMM, dddd')}</Typography>
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
    <div className={classes.actions} />

  </div>

OrderCard.propTypes = {
  classes: object.isRequired,
  order: orderShape.isRequired
}

export default withStyles(styles)(OrderCard)
