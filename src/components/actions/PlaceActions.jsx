import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import { connect } from 'utils'
import { actions, select } from 'src/redux'
import { withRouter } from 'react-router-dom'
import { OrderForm, Form, FormDialog } from 'components'
import { placeShape } from 'shapes'

const styles = {
  root: {},
  primary: {
    marginRight: 20,
  }
}

class PlaceActions extends Component {

  state = {
    isPlaceOrderOpen: false,
  }

  createRoom = async () => {
    const { history, redux: { place, createRoom } } = this.props

    const action = await createRoom({
      title: place.entertainment.title,
      place_id: place.id
    })

    history.push(`/rooms/${action.value.id}`)

    return action
  }

  openPlaceOrder = () =>
    this.setState({ isPlaceOrderOpen: true })

  closePlaceOrder = () =>
    this.setState({ isPlaceOrderOpen: false })

  orderPlace = () => {

  }

  render() {
    const { classes, redux: { place } } = this.props
    const { isPlaceOrderOpen } = this.state

    return (
      <div className={classes.root}>
        <Button
          className={classes.primary}
          color="primary"
          variant="contained"
          onClick={this.createRoom}
        >
          Собрать друзей
        </Button>
        <Button onClick={this.openPlaceOrder}>Заказать</Button>

        <FormDialog isOpen={isPlaceOrderOpen} onClose={this.closePlaceOrder}>
          <Form
            place={place}
            component={OrderForm}
            onSubmit={this.orderPlace}
          />
        </FormDialog>
      </div>
    )
  }
}

PlaceActions.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  redux: shape({
    place: placeShape,
    createRoom: func.isRequired,
  })
}

const redux = (state, { place_id: id }) => ({
  place: select.places.current(state, id),
  createRoom: actions.rooms.create
})
export default withStyles(styles)(connect(redux)(withRouter(PlaceActions)))
