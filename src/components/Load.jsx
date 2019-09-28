import React, { Component } from 'react'
import { func, node, object, string, any } from 'prop-types'
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
    const { load, params, onError, onLoad } = this.props
    try {
      this.setState({ error: null })
      const result = await load(params)
      this.setState({ isLoaded: true })
      onLoad(result)
    } catch (error) {
      this.setState({ error })
      onError(error)
    }
  }

  async componentDidUpdate(next) {
    const prev = this.props
    if (JSON.stringify(prev.params) === JSON.stringify(next.params)) return
    await this.load(next.params)
  }

  render() {
    const { classes, children, className } = this.props
    const { isLoaded, isLoading, error } = this.state

    if (error) {
      return (
        <div className={classes.loading}>
          <div className={classes.errorContainer}>
            <ErrorIcon className={classes.error} />
            <Typography color="textSecondary">{error.message}</Typography>
            <Typography color="textSecondary">{error.error?.message}</Typography>
          </div>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      )
    }

    if (isLoaded) {
      return (
        <div className={className}>
          {children}
        </div>
      )
    }

    return null
  }
}

Load.propTypes = {
  classes: object.isRequired,
  className: string,
  params: any,
  load: func.isRequired,
  children: node,
  onLoad: func.isRequired,
  onError: func.isRequired,
}

Load.defaultProps = {
  onLoad: () => {},
  onError: () => {}
}

export default withStyles(styles)(Load)
