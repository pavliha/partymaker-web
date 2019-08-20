import React, { Component } from 'react'
import { func, node } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Loading from 'components/Loading'
import ErrorIcon from 'mdi-react/ErrorIcon'

const styles = {
  root: {},
  loading: {
    flex: 1,
  }
}

class Load extends Component {

  state = {
    isLoaded: false,
    isError: false,
  }

  async componentDidMount() {
    const { promise, onError, onLoad } = this.props
    try {
      this.setState({ isError: false })
      await promise()
      this.setState({ isLoaded: true })
      onLoad()
    } catch (err) {
      this.setState({ isError: true })
      onError(err)
    }
  }

  render() {
    const { classes, children } = this.props
    const { isLoaded, isError } = this.state
    if (!isLoaded) return <Loading className={classes.loading} />
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
