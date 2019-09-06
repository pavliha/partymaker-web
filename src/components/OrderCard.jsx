import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { Typography, withStyles, Button } from '@material-ui/core'
import { FieldLabel } from 'components'
import orderShape from 'shapes/order'
import moment from 'moment'
import wait from 'utils/wait'

const styles = {
  root: {},
  actions: {
    marginTop: 20,
  },
  reject: {
    marginLeft: 5,
  },
  response: {}
}

class OrderCard extends Component {

  state = {
    showResponse: false
  }

  confirm = () => {
    const { order, onConfirm } = this.props
    this.flashResponse()
    return onConfirm(order)
  }

  reject = () => {
    const { order, onReject } = this.props
    this.flashResponse()
    return onReject(order)
  }

  flashResponse = () => {
    this.setState({ showResponse: true })
    wait(3000).then(() =>
      this.setState({ showResponse: false })
    )
  }

  render() {
    const { classes, order } = this.props
    const { showResponse } = this.state
    const isConfirmed = order.state === 'confirmed'
    const isRejected = order.state === 'rejected'

    return (
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
        <div className={classes.actions}>
          <Button
            disabled={isConfirmed}
            color="primary"
            variant="outlined"
            onClick={this.confirm}
          >
            {isConfirmed ? 'Заказ подтвержден' : 'Подтвердить заказ'}
          </Button>
          <Button
            disabled={isRejected}
            className={classes.reject}
            onClick={this.reject}
          >
            {isRejected ? 'Отказано' : 'Отказать'}
          </Button>
        </div>
        {showResponse && (
          <Typography color="textSecondary" variant="caption" className={classes.response}>
            Спасибо. Ваш ответ был отправлен участникам группы
          </Typography>)
        }

      </div>
    )
  }
}

OrderCard.propTypes = {
  classes: object.isRequired,
  order: orderShape.isRequired,
  onConfirm: func.isRequired,
  onReject: func.isRequired,
}

export default withStyles(styles)(OrderCard)
