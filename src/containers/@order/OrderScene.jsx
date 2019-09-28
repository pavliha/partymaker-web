import React, { Component } from 'react'
import { object, shape, string } from 'prop-types'
import api from 'api'
import userShape from 'shapes/user'
import { GuestList, ProfileHeader, Load, OrderCard, PlaceCard } from 'components'
import { Typography, withStyles } from '@material-ui/core'
import { connect, select } from 'src/redux'

const styles = theme => ({
  root: {},
  container: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  place: {},

  order: {
    padding: 20,
    flex: 1,
  },
  guests: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'block'
    },
    padding: 20,
    minWidth: 320,
  }
})

class OrderScene extends Component {

  state = {
    order: null
  }

  load = async () => {
    const { match } = this.props
    const order = await api.order.load(match.params.token)
    this.setState({ order })
    return order
  }

  confirm = async ({ token }) => {
    const order = await api.order.confirm(token)
    this.setState({ order })
  }

  reject = async ({ token }) => {
    const order = await api.order.reject(token)
    this.setState({ order })
  }

  render() {
    const { classes, redux: { auth } } = this.props
    const { order } = this.state

    return (
      <Load load={this.load}>
        <div className={classes.root}>
          <ProfileHeader user={auth} />
          <div className={classes.container}>
            <div className={classes.place}>
              {order?.room?.place && <PlaceCard place={order.room.place} />}
            </div>
            <div className={classes.order}>
              <OrderCard
                order={order}
                onConfirm={this.confirm}
                onReject={this.reject}
              />
            </div>
            <div className={classes.guests}>
              <Typography variant="h5">Участники</Typography>
              {order?.room?.users && <GuestList hideOnline guests={order.room.users} />}
            </div>
          </div>
        </div>
      </Load>
    )
  }
}

OrderScene.propTypes = {
  classes: object.isRequired,
  match: shape({ params: shape({ token: string }) }),
  redux: shape({
    auth: userShape,
  })
}

const redux = state => ({
  auth: select.auth.user(state)
})

export default withStyles(styles)(connect(redux)(OrderScene))
