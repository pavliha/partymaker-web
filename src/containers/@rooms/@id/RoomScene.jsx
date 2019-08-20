import React, { Component } from 'react'
import { object, shape, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { actions, select, connect } from 'src/redux'
import RoomTitle from './RoomTitle'
import { InviteButton, Load } from 'components'
import Guests from './Guests'

const styles = {
  root: {
    display: 'flex',
    maxHeight: 'calc(100vh - 65px)',
    flexGrow: 1,
  },
  guests: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    borderRight: 'solid 1px rgba(0, 0, 0, 0.12)',
  },
  chat: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 65px)',
  }
}

class RoomScene extends Component {

  loadRoom = () => {
    const { redux: { loadRoom }, match } = this.props
    return loadRoom(match.params.id)
  }

  render() {
    const { classes, redux: { room } } = this.props

    return (
      <Load promise={this.loadRoom}>
        <section className={classes.root}>
          <div className={classes.guests}>
            <RoomTitle room={room} action={<InviteButton onClick={() => {}} />} />
            {room?.guests && <Guests guests={room.guests} />}
          </div>
        </section>
      </Load>
    )
  }
}

RoomScene.propTypes = {
  classes: object.isRequired,
  match: shape({ params: shape({ id: string.isRequired, }), }),
}

const redux = (state, { match }) => ({
  room: select.rooms.current(state, match.params.id),
  loadRoom: actions.rooms.load,
})

export default withStyles(styles)(connect(redux)(RoomScene))
