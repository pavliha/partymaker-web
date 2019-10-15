import React, { Component } from 'react'
import { object, func, shape, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { AvatarField } from 'components'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
}

class AvatarForm extends Component {

  updateAvatar = (name, value) => {
    const { formik: { setFieldValue, submitForm } } = this.props

    setFieldValue('avatar_url', value)
    setTimeout(submitForm, 0)
  }

  render() {
    const { classes, username, formik: { values: { avatar_url } } } = this.props

    return (
      <div className={classes.root}>
        <AvatarField
          name="avatar_url"
          username={username}
          value={avatar_url}
          onChange={this.updateAvatar}
        />
      </div>
    )
  }
}

AvatarForm.propTypes = {
  classes: object.isRequired,
  username: string.isRequired,
  formik: shape({
    setFieldValue: func,
    submitForm: func,
  })
}

AvatarForm.mapPropsToValues = ({ user }) => ({
  avatar_url: user?.avatar_url || ''
})

export default withStyles(styles)(AvatarForm)
