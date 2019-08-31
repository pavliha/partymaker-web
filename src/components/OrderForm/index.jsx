/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import { object, func } from 'prop-types'
import { withStyles, Button, Typography } from '@material-ui/core'
import roomShape from 'shapes/room'
import userShape from 'shapes/user'
import { Form, Field } from 'formik'
import { FieldLabel } from 'components'
import { ServerMessage, TextField } from 'components/formik'
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

const OrderForm = ({ classes, room, handleSubmit }) =>
  <Form className={classes.root}>
    <div className={classes.outline}>
      <FieldLabel title="Дата">
        <Field type="date" name="date" component={TextField} />
      </FieldLabel>
      <FieldLabel title="Время">
        <Field type="time" name="time" component={TextField} />
      </FieldLabel>
      <FieldLabel title="Количество учасников">
        <Field type="number" name="guests" component={TextField} />
      </FieldLabel>
      <FieldLabel title="Ваш номер телефона">
        <Field name="phone" component={TextField} />
      </FieldLabel>
    </div>
    <ServerMessage color="error" name="non_field_error" />
    <div className={classes.actions}>
      <Typography className={classes.actionCaption} color="textSecondary" variant="caption">
        Организатору отправится смс с вашим заказом
      </Typography>
      <Button onClick={handleSubmit} color="primary" variant="outlined">Заказать</Button>
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
  auth: userShape.isRequired,
  handleSubmit: func.isRequired,
}

export default withStyles(styles)(formik(OrderForm))
