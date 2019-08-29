import React, { Component } from 'react'
import { object, string, func, shape } from 'prop-types'
import { withStyles, IconButton, CircularProgress, SvgIcon } from '@material-ui/core'
import AttachFileIcon from 'mdi-react/AttachFileIcon'
import ErrorIcon from 'mdi-react/ErrorIcon'
import { actions, connect } from 'src/redux'

const styles = {
  root: {
    position: 'relative'
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loading: {
    position: 'absolute',
    top: -6,
    left: 6
  }
}

class AssetField extends Component {

  state = {
    isLoading: false,
    isError: false,
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  upload = async (e) => {
    const { redux: { createAsset }, name, onChange } = this.props
    this.setState({ isLoading: true })

    try {
      const response = await createAsset(e.target.files[0])
      this.setState({ isLoading: false })

      onChange(name, response.value)
    } catch (err) {
      console.error(err)
      this.setState({
        isError: true,
        isLoading: false
      })
      this.timer = setTimeout(() => this.setState({ isError: false, isLoading: false }), 2000)
    }
  }

  render() {
    const { classes } = this.props
    const { isLoading, isError } = this.state

    return (
      <>
        <input
          className={classes.input}
          id="upload-asset-input"
          type="file"
          onChange={this.upload}
        />
        <label className={classes.root} htmlFor="upload-asset-input">
          <IconButton disabled={isLoading} component="span">
            <AttachFileIcon />
          </IconButton>
          {isLoading && <CircularProgress size={36} className={classes.loading} />}
          {isError && <SvgIcon color="error" size={36} className={classes.loading}><ErrorIcon /></SvgIcon>}
        </label>
      </>
    )
  }
}

AssetField.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  redux: shape({
    createAsset: func.isRequired,
  }),
}

const redux = () => ({
  createAsset: actions.assets.create
})

export default withStyles(styles)(connect(redux)(AssetField))
