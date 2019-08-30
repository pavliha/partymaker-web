/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import { Form, Field } from 'formik'
import { bool, object, shape, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { AssetField, MessageField } from 'components/formik'
import formik from './formik'
import SendIcon from 'mdi-react/SendIcon'
import InviteOverlay from './InviteOverlay'
import { ChatFormActions } from 'components'
import OverlayManager from './OverlayManager'
import GuestOverlay from './GuestOverlay'
import DatetimeOverlay from './DatetimeOverlay'

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
  }
}

class ChatForm extends Component {

  state = {
    isInviteOpen: false,
    isDatetimeOpen: false,
  }

  toggleInvite = () =>
    this.setState(state => ({ isInviteOpen: !state.isInviteOpen }))

  toggleDatetime = () =>
    this.setState(state => ({ isDatetimeOpen: !state.isDatetimeOpen }))

  sendDateTimeMessage = ({ date, time }) => {
    const { setFieldValue, submitForm } = this.props
    setFieldValue('date', date)
    setFieldValue('time', time)
    submitForm()
    this.toggleDatetime()
  }

  render() {
    const { classes, values, invite_token, isGuest, onJoin, isMultipleGuests, isTimeSelected } = this.props
    const { isInviteOpen, isDatetimeOpen } = this.state

    const overlays = [
      isDatetimeOpen && <DatetimeOverlay onSubmit={this.sendDateTimeMessage} onClose={this.toggleDatetime} />,
      isInviteOpen && <InviteOverlay invite_token={invite_token} onClose={this.toggleInvite} />,
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
          isMultipleGuests={isMultipleGuests}
          isTimeSelected={isTimeSelected}
          onInvite={this.toggleInvite}
          onTime={this.toggleDatetime}
          onOrder={() => {}}
        />
      </Form>
    )
  }
}

ChatForm.propTypes = {
  classes: object.isRequired,
  values: shape({ text: string.isRequired, }),
  invite_token: string.isRequired,
  isGuest: bool,
  isMultipleGuests: bool,
  isTimeSelected: bool,
  onSubmit: func.isRequired,
  onJoin: func.isRequired,
  setFieldValue: func.isRequired,
  submitForm: func.isRequired,
}

export default withStyles(styles)(formik(ChatForm))
