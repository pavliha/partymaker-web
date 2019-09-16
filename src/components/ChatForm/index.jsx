/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import { Form, Field } from 'formik'
import { bool, object, shape, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import SendIcon from 'mdi-react/SendIcon'
import roomShape from 'shapes/room'
import userShape from 'shapes/user'
import { AssetField, MessageField } from 'components/formik'
import { ChatFormActions, FormDialog } from 'components'
import InviteOverlay from './InviteOverlay'
import OverlayManager from './OverlayManager'
import GuestOverlay from './GuestOverlay'
import DatetimeOverlay from './DatetimeOverlay'
import OrderForm from '../OrderForm'
import formik from './formik'
import { FRONTEND_URL } from 'config/app'

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
}

class ChatForm extends Component {

  state = {
    isInviteOpen: false,
    isDatetimeOpen: false,
    isOrderDialogOpen: false,
  }

  toggleInvite = () => {
    const { room } = this.props
    if (navigator.share) {
      navigator.share({
        title: 'Partymaker Invite',
        text: room.title,
        url: `${FRONTEND_URL}/invite/${room.invite_token}`,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    } else {
      this.setState(state => ({ isInviteOpen: !state.isInviteOpen }))
    }
  }

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

  orderPlace = async (form) => {
    const { onOrder } = this.props
    const action = await onOrder(form)
    this.toggleOrderDialog()
    return action
  }

  handleSend = (e) => {
    const { inputRef, props: { submitForm } } = this
    submitForm()
    e.preventDefault()
    inputRef.focus()
  }

  render() {
    const { classes, values, room, isGuest, onJoin, auth } = this.props
    const { isInviteOpen, isDatetimeOpen, isOrderDialogOpen } = this.state

    const overlays = [
      isDatetimeOpen && <DatetimeOverlay onSubmit={this.sendDateTimeMessage} onClose={this.toggleDatetime} />,
      isInviteOpen && <InviteOverlay invite_token={room.invite_token} onClose={this.toggleInvite} />,
      isGuest && <GuestOverlay onJoin={onJoin} />
    ]

    return (
      <Form className={classes.root}>
        <OverlayManager overlays={overlays}>
          <Field
            name="text"
            className={classes.sendField}
            inputRef={(ref) => { this.inputRef = ref }}
            component={MessageField}
          />
          {values.text
            ? <IconButton color="primary" onMouseDown={this.handleSend}><SendIcon /></IconButton>
            : <Field name="asset_id" component={AssetField} />
          }
        </OverlayManager>
        <ChatFormActions
          room={room}
          isGuest={isGuest}
          onInvite={this.toggleInvite}
          onTime={this.toggleDatetime}
          onOrder={this.toggleOrderDialog}
        />
        <FormDialog
          title="Заказать"
          isOpen={isOrderDialogOpen}
          onClose={this.toggleOrderDialog}
        >
          <OrderForm
            auth={auth}
            room={room}
            onSubmit={this.orderPlace}
          />
        </FormDialog>
      </Form>
    )
  }
}

ChatForm.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
  auth: userShape,
  isGuest: bool,
  onSubmit: func.isRequired,
  onJoin: func.isRequired,
  onOrder: func.isRequired,
  values: shape({ text: string.isRequired, }),
  setFieldValue: func.isRequired,
  submitForm: func.isRequired,
}

export default withStyles(styles)(formik(ChatForm))
