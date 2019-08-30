import React, { Component } from 'react'
import { func, node, object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { Loading } from 'components'
import ErrorIcon from 'mdi-react/ErrorIcon'

const styles = theme => ({
  root: {},
  loading: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    width: 100,
    height: 100,
    color: theme.palette.error.main
  }
})

class Load extends Component {

  state = {
    isLoaded: false,
    error: null,
  }

  async componentDidMount() {
    const { promise, onError, onLoad } = this.props
    try {
      this.setState({ error: null })
      await promise()
      this.setState({ isLoaded: true })
      onLoad()
    } catch (error) {
      this.setState({ error })
      onError(error)
    }
  }

  render() {
    const { classes, children } = this.props
    const { isLoaded, error } = this.state

    if (error) {
      return (
        <div className={classes.loading}>
          <div className={classes.errorContainer}>
            <ErrorIcon className={classes.error} />
            <Typography color="textSecondary">{error.message}</Typography>
            <Typography color="textSecondary">{error.error.message}</Typography>
          </div>
        </div>
      )
    }

    if (!isLoaded) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      )
    }

    return children
  }
}

Load.propTypes = {
  classes: object.isRequired,
  promise: func.isRequired,
  children: node,
  onLoad: func.isRequired,
  onError: func.isRequired,
}

Load.defaultProps = {
  onLoad: () => {},
  onError: () => {}
}

export default withStyles(styles)(Load)
