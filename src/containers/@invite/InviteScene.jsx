import React, { Component } from 'react'
import { object, shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import invite from 'api/invite'
import Loading from 'components/loaders/Loading'

const styles = {
  root: {},
}

class InviteScene extends Component {

  async componentDidMount() {
    const { match, history } = this.props
    const { invite_token } = match.params
    const room = await invite.load(invite_token)
    history.push(`/rooms/${room.id}`)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Loading />
      </div>
    )
  }
}

InviteScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func.isRequired }),
  match: shape({ params: shape({ invite_token: string }) }),

}

export default withStyles(styles)(InviteScene)
