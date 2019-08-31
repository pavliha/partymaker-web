/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import { Form, Field } from 'formik'
import { bool, object, shape, string, func } from 'prop-types'
import { IconButton, withStyles, Dialog, DialogTitle } from '@material-ui/core'
import SendIcon from 'mdi-react/SendIcon'
import roomShape from 'shapes/room'
import userShape from 'shapes/user'
import { AssetField, MessageField } from 'components/formik'
import { ChatFormActions } from 'components'
import InviteOverlay from './InviteOverlay'
import OverlayManager from './OverlayManager'
import GuestOverlay from './GuestOverlay'
import DatetimeOverlay from './DatetimeOverlay'
import OrderForm from './OrderForm'
import formik from './formik'
import CloseButton from 'components/CloseButton'

const styles = {
  root: {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.12)'
  },

  sendField: {
    flexGrow: 1,
  },
  actions: {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    alignItems: 'center',
    padding: 5,
  },
  action: {
    margin: '0 5px'
  },
  actionLabel: {
    paddingLeft: 5,
    marginTop: 1,
  },
  arrow: {
    color: 'rgba(0, 0, 0, 0.12)'
  },
  orderTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 2,
  }
}

class ChatForm extends Component {

  state = {
    isInviteOpen: false,
    isDatetimeOpen: false,
    isOrderDialogOpen: false,
  }

  toggleInvite = () =>
    this.setState(state => ({ isInviteOpen: !state.isInviteOpen }))

  toggleDatetime = () =>
    this.setState(state => ({ isDatetimeOpen: !state.isDatetimeOpen }))

  toggleOrderDialog = () =>
    this.setState(state => ({ isOrderDialogOpen: !state.isOrderDialogOpen }))

  sendDateTimeMessage = ({ date, time }) => {
    const { setFieldValue, submitForm } = this.props
    setFieldValue('date', date)
    setFieldValue('time', time)
    submitForm()
    this.toggleDatetime()
  }

  render() {
    const { classes, values, room, isGuest, onJoin, auth, } = this.props
    const { isInviteOpen, isDatetimeOpen, isOrderDialogOpen } = this.state

    const overlays = [
      isDatetimeOpen && <DatetimeOverlay onSubmit={this.sendDateTimeMessage} onClose={this.toggleDatetime} />,
      isInviteOpen && <InviteOverlay invite_token={room.invite_token} onClose={this.toggleInvite} />,
      isGuest && <GuestOverlay onJoin={onJoin} />
    ]

    return (
      <Form className={classes.root}>
        <OverlayManager overlays={overlays}>
          <Field name="text" className={classes.sendField} component={MessageField} />
          {values.text
            ? <IconButton type="submit" color="primary"><SendIcon /></IconButton>
            : <Field name="asset_id" component={AssetField} />
          }
        </OverlayManager>
        <ChatFormActions
          room={room}
          onInvite={this.toggleInvite}
          onTime={this.toggleDatetime}
          onOrder={this.toggleOrderDialog}
        />
        <Dialog
          open={isOrderDialogOpen}
          onClose={this.toggleOrderDialog}
        >
          <div className={classes.orderTitle}>
            <DialogTitle>Заказ</DialogTitle>
            <CloseButton onClick={this.toggleOrderDialog} />
          </div>
          <OrderForm user={auth} room={room} />
        </Dialog>

      </Form>
    )
  }
}

ChatForm.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
  auth: userShape.isRequired,
  isGuest: bool,
  onSubmit: func.isRequired,
  onJoin: func.isRequired,
  // formik props
  values: shape({ text: string.isRequired, }),
  setFieldValue: func.isRequired,
  submitForm: func.isRequired,
}

export default withStyles(styles)(formik(ChatForm))
