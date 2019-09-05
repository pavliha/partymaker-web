import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import { Redirect } from 'react-router-dom'
import api from 'api'
import { Load } from 'components'

class OrderTokenScene extends Component {

  state = {
    order: null
  }

  load = async () => {
    const { match } = this.props
    const order = await api.order.load(match.params.token)
    this.setState({ order })
    return order
  }

  render() {
    const { order } = this.state

    return (
      <Load promise={this.load}>
        {order && <Redirect to={`/orders/${order.id}`} />}
      </Load>
    )
  }
}

OrderTokenScene.propTypes = {
  match: shape({ params: shape({ token: string }) }),
}

export default OrderTokenScene
