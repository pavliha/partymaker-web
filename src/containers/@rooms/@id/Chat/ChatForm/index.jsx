import React, { Component } from 'react'
import { Form, Field } from 'formik'
import { object, shape, string } from 'prop-types'
import { Button, IconButton, withStyles } from '@material-ui/core'
import FormikMessageField from './controls/FormikMessageField'
import AssetField from './controls/FormikAssetField'
import formik from './formik'
import SendIcon from 'mdi-react/SendIcon'
import KeyboardArrowRightIcon from 'mdi-react/KeyboardArrowRightIcon'
import { connect } from 'src/redux'
import InviteOverlay from './InviteOverlay'

const styles = {
  root: {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.12)'
  },
  send: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 5px'
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
    const { classes, values, invite_token } = this.props
    const { isInviteOpen } = this.state
    return (
      <Form className={classes.root}>
        {isInviteOpen
          ? <InviteOverlay invite_token={invite_token} onClose={this.closeInvite} />
          : (
            <div className={classes.send}>
              <Field name="text" className={classes.sendField} component={FormikMessageField} />
              {values.text
                ? <IconButton type="submit" color="primary"><SendIcon /></IconButton>
                : <Field name="asset_id" component={AssetField} />
              }
            </div>
          )
        }

        <div className={classes.actions}>
          <Button color="primary" className={classes.actionLabel} onClick={this.toggleInvite}>
            Пригласить друзей
          </Button>
          <KeyboardArrowRightIcon className={classes.arrow} />
          <Button color="primary" disabled className={classes.actionLabel}>
            Выбрать время
          </Button>
          <KeyboardArrowRightIcon className={classes.arrow} />
          <Button color="primary" disabled className={classes.actionLabel}>
            Заказать
          </Button>
        </div>
      </Form>
    )
  }
}

ChatForm.propTypes = {
  classes: object.isRequired,
  values: shape({
    text: string.isRequired,
  }),
  invite_token: string.isRequired,
}

const redux = state => ({
  auth_id: state.auth.user_id,
})

export default withStyles(styles)(connect(redux)(formik(ChatForm)))
