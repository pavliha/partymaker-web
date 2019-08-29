/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import { Form, Field } from 'formik'
import { bool, object, shape, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import FormikMessageField from './FormikMessageField'
import AssetField from './FormikAssetField'
import formik from './formik'
import SendIcon from 'mdi-react/SendIcon'
import InviteOverlay from './InviteOverlay'
import FormActions from './FormActions'
import OverlayManager from './OverlayManager'
import GuestOverlay from './GuestOverlay'

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
  }

  toggleInvite = () =>
    this.setState(state => ({ isInviteOpen: !state.isInviteOpen }))

  closeInvite = () =>
    this.setState({ isInviteOpen: false })

  render() {
    const { classes, values, invite_token, isGuest, onJoin } = this.props
    const { isInviteOpen } = this.state

    const overlays = [
      isInviteOpen && <InviteOverlay invite_token={invite_token} onClose={this.closeInvite} />,
      isGuest && <GuestOverlay onJoin={onJoin} />
    ]

    return (
      <Form className={classes.root}>
        <OverlayManager overlays={overlays}>
          <Field name="text" className={classes.sendField} component={FormikMessageField} />
          {values.text
            ? <IconButton type="submit" color="primary"><SendIcon /></IconButton>
            : <Field name="asset_id" component={AssetField} />
          }
        </OverlayManager>
        <FormActions
          isGuest={isGuest}
          onInvite={this.toggleInvite}
          onTime={() => {}}
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
  onSubmit: func.isRequired,
  onJoin: func.isRequired,
}

export default withStyles(styles)(formik(ChatForm))
