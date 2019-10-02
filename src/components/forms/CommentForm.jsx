import React, { Component } from 'react'
import { Form } from 'formik'
import { object, shape, string, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import SendIcon from 'mdi-react/SendIcon'
import { MessageField, ServerMessage, Field } from 'components'
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
    const { inputRef, props: { formik } } = this
    formik.submitForm()
    e.preventDefault()
    inputRef.focus()
  }

  render() {
    const { classes, formik: { values } } = this.props

    return (
      <Form className={classes.root}>
        <div className={classes.field}>
          <Field
            name="text"
            placeholder="Ваш комментарий"
            className={classes.sendField}
            inputRef={(ref) => { this.inputRef = ref }}
            onSend={this.handleSend}
            component={MessageField}
          />
          {values.text && (
            <div>
              <IconButton
                color="primary"
                onMouseDown={this.handleSend}
              >
                <SendIcon />
              </IconButton>
            </div>
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
  formik: shape({
    values: shape({ text: string.isRequired, }),
    submitForm: func.isRequired,
  })
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
