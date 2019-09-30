import React, { Component } from 'react'
import { Form, Field } from 'formik'
import { object, shape, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import SendIcon from 'mdi-react/SendIcon'
import { MessageField, ServerMessage } from 'components/formik'
import formik from './formik'

const styles = {

  root: {},

  field: {
    display: 'flex'
  },

  sendField: {
    flexGrow: 1,
  },
  error: {
    marginLeft: 15,
  },
}

class CommentForm extends Component {

  handleSend = (e) => {
    const { inputRef, props: { submitForm } } = this
    submitForm()
    e.preventDefault()
    inputRef.focus()
  }

  render() {
    const { classes, values } = this.props

    return (
      <Form className={classes.root}>
        <div className={classes.field}>
          <Field
            name="text"
            placeholder="Ваш комментарий"
            className={classes.sendField}
            inputRef={(ref) => { this.inputRef = ref }}
            component={MessageField}
          />
          {values.text && (
            <IconButton
              color="primary"
              onMouseDown={this.handleSend}
            >
              <SendIcon />
            </IconButton>
          )}
        </div>
        <ServerMessage
          className={classes.error}
          variant="caption"
          color="error"
          name="non_field_error"
        />
      </Form>
    )
  }
}

CommentForm.propTypes = {
  classes: object.isRequired,
  values: shape({ text: string.isRequired, }),
  submitForm: func.isRequired,
}

export default withStyles(styles)(formik(CommentForm))
