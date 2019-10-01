import React, { Component } from 'react'
import { Form, Field } from 'formik'
import { object, shape, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import SendIcon from 'mdi-react/SendIcon'
import { MessageField, ServerMessage } from 'components'
import to from 'util-to'
import transformValidationApi from 'utils/transformValidationApi'
import uniqId from 'uniqid'

const styles = {

  root: {
    display: 'flex',
    flexDirection: 'column',
  },

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

CommentForm.mapPropsToValues = () => ({
  text: '',
  token: `temp-${uniqId()}`,
})

CommentForm.handleSubmit = async (form, { props, setErrors, setSubmitting, resetForm }) => {
  if (!form.text) return
  setSubmitting(true)
  resetForm(CommentForm.mapPropsToValues())
  const [err] = await to(props.onSubmit(form))
  if (err) setErrors(transformValidationApi(err))

  setSubmitting(false)
}

export default withStyles(styles)(CommentForm)
