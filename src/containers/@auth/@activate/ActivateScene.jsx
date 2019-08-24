import React from 'react'
import { bool, string, func, shape } from 'prop-types'
import { Typography } from '@material-ui/core'
import { Loading, AuthCard } from 'components'
import { connect, actions } from 'src/redux'

class ActivateScene extends React.Component {
  componentDidMount() {
    const { redux, isActive, match, history } = this.props
    if (isActive) history.push('/home')
    redux.activate(match.params.hash)
  }

  render() {
    const { isLoading, isActive } = this.props

    if (isLoading) return <Loading />

    return (
      <AuthCard
        documentTitle="Активация - Partymaker"
        images="register.jpg"
        title={isActive
          ? <Typography variant="h5" align="center">Активация прошла успешно</Typography>
          : <Typography variant="h5" align="center" color="error">Активация не успешна</Typography>}
      />
    )
  }
}

ActivateScene.propTypes = {
  isActive: bool.isRequired,
  isLoading: bool.isRequired,
  redux: shape({
    activate: func.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired,
  match: shape({
    params: shape({
      hash: string,
    })
  }).isRequired,
}

const redux = () => ({
  activate: actions.auth.activate
})

export default connect(redux)(ActivateScene)
