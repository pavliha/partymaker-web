import React from 'react'
import { object, func, shape } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import orderShape from 'shapes/order'
import { actions, connect, select } from 'src/redux'
import { Header, Load, PlaceCard, OrderCard, GuestList } from 'components'

const styles = {
  root: {},
  container: {
    display: 'flex'
  },
  order: {
    padding: 20,
    flex: 1,
  },
  guests: {
    padding: 20,
    minWidth: 320,
  }
}

const OrderScene = ({ classes, redux: { auth, order, loadOrder } }) => {
  return (
    <Load promise={loadOrder}>
      <div className={classes.root}>
        <Header user={auth} />
        <div className={classes.container}>
          <div>
            {order?.room?.place && <PlaceCard place={order.room.place} />}
          </div>
          <div className={classes.order}>
            <OrderCard order={order} />
          </div>
          <div className={classes.guests}>
            <Typography variant="h5">Участники</Typography>
            {order?.room?.guests && <GuestList guests={order.room.guests} />}
          </div>
        </div>
      </div>
    </Load>
  )
}

OrderScene.propTypes = {
  classes: object.isRequired,
  redux: shape({
    order: orderShape,
    loadOrder: func.isRequired,
  })
}

const redux = (state, { match: { params: { id } } }) => ({
  auth: select.auth.user(state),
  order: select.orders.current(state, id),
  loadOrder: () => actions.orders.load(id)
})

export default withStyles(styles)(connect(redux)(OrderScene))
