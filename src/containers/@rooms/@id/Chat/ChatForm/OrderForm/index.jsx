import React from 'react'
import { object } from 'prop-types'
import { withStyles, Button, Typography } from '@material-ui/core'
import roomShape from 'shapes/room'
import { Form, Field } from 'formik'
import { FieldLabel } from 'components'
import { TextField } from 'components/formik'
import classNames from 'classnames'
import formik from './formik'

const styles = {
  root: {
    padding: 20,
    width: 500,
  },
  outline: {
    borderRadius: 3,
    padding: 15,
    border: '1px solid rgba(0,0,0,0.1)'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,

  },
  actionCaption: {
    paddingRight: 10,
    textAlign: 'right',
    flex: 1,
  },
  phone: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const OrderForm = ({ classes, room }) =>
  <Form className={classes.root}>
    <div className={classes.outline}>
      <FieldLabel title="Дата">
        <Field name="date" component={TextField} />
      </FieldLabel>
      <FieldLabel title="Время">
        <Field name="time" component={TextField} />
      </FieldLabel>
      <FieldLabel title="Количество учасников">
        <Field name="guest_count" component={TextField} />
      </FieldLabel>
      <FieldLabel title="Ваш номер телефона">
        <Field name="phone" component={TextField} />
      </FieldLabel>
    </div>
    <div className={classes.actions}>
      <Typography className={classes.actionCaption} color="textSecondary" variant="caption">
        Организатору отправится смс с вашим заказом
      </Typography>
      <Button color="primary" variant="outlined">Заказать</Button>
    </div>
    <div className={classNames([classes.outline, classes.phone])}>
      <div>
        <Typography
          align="center"
          color="textSecondary"
          variant="caption"
          gutterBottom
        >
          Или позвоните и скажите ему лично
        </Typography>
        <Typography align="center">
          {room.place.phone}
        </Typography>
      </div>
    </div>
  </Form>

OrderForm.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
}

export default withStyles(styles)(formik(OrderForm))
