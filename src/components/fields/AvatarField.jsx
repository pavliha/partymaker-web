import React, { Component } from 'react'
import { object, string, func } from 'prop-types'
import api from 'api'
import { Typography, withStyles } from '@material-ui/core'
import UserAvatar from 'components/zzz/UserAvatar'
import transformValidationApi from 'utils/transformValidationApi'

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },
  accountIcon: {
    marginRight: 15,
    width: 80,
    height: 80,
  },
  label: {
    cursor: 'pointer',
    fontFamily: 'Google Sans',
  }
}

class AvatarField extends Component {
  fileInput = React.createRef()

  state = {
    loading: 0,
    url: '',
  }

  findSomePicture = (clipboardItems) =>
    Array.from(clipboardItems).find(item => item.type.includes('image'))

  handleChange = (e) => {
    this.setState({ url: e.target.value })
    this.setError(null)
  }

  handlePaste = async ({ clipboardData }) => {
    const file = this.findSomePicture(clipboardData.files)
    if (file) await this.uploadFile(file)
  }

  handleFileInput = e =>
    this.uploadFile(e.target.files[0])

  setError = (error) => {
    const { onError } = this.props
    if (!error) return onError(null)
    const { file, url } = transformValidationApi(error)
    onError(file || url)
  }

  clickFileInput = () =>
    this.fileInput.current.click()

  watchProgress = (progress) =>
    this.setState({ loading: progress === 100 ? 0 : progress })

  uploadFile = async file =>
    this.upload(() => api.asset.create(file, this.watchProgress))

  upload = async (callback) => {
    const { name, onChange } = this.props
    try {
      const asset = await callback()
      this.setState({ url: '' })
      onChange(name, asset.url)
    } catch (error) {
      this.setError(error)
    }
  }

  render() {
    const { classes, value: avatar_url, username: name } = this.props

    return (
      <div className={classes.root}>
        <UserAvatar
          user={{ name, avatar_url }}
          className={classes.accountIcon}
          clickable
          onClick={this.clickFileInput}
        />
        <Typography className={classes.label} onClick={this.clickFileInput}>Сменить аватар</Typography>
        <input
          ref={this.fileInput}
          accept="image/*"
          className={classes.fileInput}
          id="upload-avatar"
          multiple
          type="file"
          onChange={this.handleFileInput}
        />
      </div>
    )
  }
}

AvatarField.propTypes = {
  classes: object.isRequired,
  username: string.isRequired,
  value: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  onError: func,
}

export default withStyles(styles)(AvatarField)
