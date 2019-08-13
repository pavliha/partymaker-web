import React, { Component } from 'react'
import { func, node } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Loading from 'components/Loading'
import ErrorIcon from 'mdi-react/ErrorIcon'

const styles = {
  root: {},
}

class Load extends Component {

  state = {
    isLoading: false,
    isError: false,
  }

  async componentDidMount() {
    const { promise, onError, onLoad } = this.props
    try {
      this.setState({ isLoading: true, isError: false })
      await promise()
      this.setState({ isLoading: false })
      onLoad()
    } catch (err) {
      this.setState({ isError: true })
      onError(err)
    }
  }

  render() {
    const { children } = this.props
    const { isLoading, isError } = this.state

    if (isLoading) return <Loading />
    if (isError) return <ErrorIcon />

    return children
  }
}

Load.propTypes = {
  promise: func.isRequired,
  children: node.isRequired,
  onLoad: func.isRequired,
  onError: func.isRequired,
}

Load.defaultProps = {
  onLoad: () => {},
  onError: () => {}
}

export default withStyles(styles)(Load)
