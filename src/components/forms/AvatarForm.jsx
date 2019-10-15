import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { AvatarField } from 'components'
import userShape from 'shapes/user'

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
    const { classes, user, formik: { values: { avatar_url, setErrors } } } = this.props

    return (
      <div className={classes.root}>
        <AvatarField
          name="avatar_url"
          username={user?.name}
          value={avatar_url}
          onChange={this.updateAvatar}
          onError={(error) => setErrors({ avatar_url: error })}
        />
      </div>
    )
  }
}

AvatarForm.propTypes = {
  classes: object.isRequired,
  user: userShape.isRequired,
  formik: shape({
    setFieldValue: func,
    submitForm: func,
  })
}

AvatarForm.mapPropsToValues = ({ user }) => ({
  avatar_url: user?.avatar_url || ''
})

export default withStyles(styles)(AvatarForm)
