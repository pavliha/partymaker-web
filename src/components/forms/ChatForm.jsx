/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import { Form } from 'formik'
import { bool, object, shape, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import SendIcon from 'mdi-react/SendIcon'
import roomShape from 'shapes/room'
import userShape from 'shapes/user'
import {
  ChatFormActions,
  FormDialog,
  Field,
  ClipboardImageDialog,
  MessageField,
  AssetField,
  OrderForm,
  InviteOverlay,
  OverlayManager,
  GuestOverlay,
  DatetimeOverlay
} from 'components'
import { FRONTEND_URL } from 'config/app'
import * as Yup from 'yup'
import to from 'util-to'
import transformValidationApi from 'utils/transformValidationApi'
import uniqId from 'uniqid'

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
    file: null,
    isClipboardDialogOpen: false,
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
    const { formik } = this.props
    formik.setFieldValue('date', date)
    formik.setFieldValue('time', time)
    formik.submitForm()
    this.toggleDatetime()
  }

  orderPlace = async (form) => {
    const { onOrder } = this.props
    const action = await onOrder(form)
    this.toggleOrderDialog()
    return action
  }

  findSomePicture = (clipboardItems) =>
    Array.from(clipboardItems).find(item => item.type.includes('image'))

  openClipboardDialog = (file) =>
    this.setState({ isClipboardDialogOpen: true, file })

  closeClipboardDialog = () =>
    this.setState({ isClipboardDialogOpen: false, file: null })

  handlePaste = ({ clipboardData }) => {
    const file = this.findSomePicture(clipboardData.files)
    if (file) this.openClipboardDialog(file)
  }

  handleSend = (e) => {
    const { inputRef, props: { formik } } = this
    formik.submitForm()
    e.preventDefault()
    inputRef.focus()
  }

  saveAttachment = (name, asset) => {
    const { formik } = this.props
    formik.setFieldValue(name, asset.id, false)
    setTimeout(() => formik.submitForm())
    this.closeClipboardDialog()
  }

  render() {
    const { classes, room, isGuest, onJoin, auth, formik: { values } } = this.props
    const { isInviteOpen, isDatetimeOpen, isOrderDialogOpen, isClipboardDialogOpen, file } = this.state

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
            placeholder="Ваше сообщение"
            className={classes.sendField}
            inputRef={(ref) => { this.inputRef = ref }}
            onPaste={this.handlePaste}
            onSend={this.handleSend}
            component={MessageField}
          />
          {values.text
            ? <IconButton color="primary" onMouseDown={this.handleSend}><SendIcon /></IconButton>
            : <Field name="asset_id" component={AssetField} onChange={this.saveAttachment} />
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
          <Form
            auth={auth}
            room={room}
            component={OrderForm}
            onSubmit={this.orderPlace}
          />
        </FormDialog>
        <ClipboardImageDialog
          isOpen={isClipboardDialogOpen}
          file={file}
          onConfirm={this.saveAttachment}
          onClose={this.closeClipboardDialog}
        />
      </Form>
    )
  }
}

ChatForm.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
  auth: userShape,
  isGuest: bool,
  onJoin: func.isRequired,
  onOrder: func.isRequired,
  formik: shape({
    values: shape({ text: string.isRequired, }),
    setFieldValue: func.isRequired,
    submitForm: func.isRequired,
  })
}

ChatForm.validationSchema = Yup.object().shape({})

ChatForm.mapPropsToValues = (props) => ({
  text: '',
  asset_id: null,
  token: `temp-${uniqId()}`,
  user_id: props?.auth?.id,
  date: '',
})

ChatForm.handleSubmit = async (form, { props, setErrors, setSubmitting, resetForm }) => {
  if (!form.text && !form.asset_id && !form.place_id && !form.date && !form.order_id) return
  setSubmitting(true)
  resetForm(ChatForm.mapPropsToValues(props))
  const [err] = await to(props.onSubmit(form))
  if (err) setErrors(transformValidationApi(err))

  setSubmitting(false)
}

export default withStyles(styles)(ChatForm)
