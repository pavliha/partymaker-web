import React, { Component } from 'react'
import { func, array, shape, string, number } from 'prop-types'
import { connect, actions, select } from 'src/redux'
import { Load, EntertainmentGroup } from 'components'

class EntertainmentList extends Component {

  newRoom = async (entertainment, place) => {
    const { redux: { createRoom, updateRoom }, onCreated, room_id } = this.props
    const form = {
      title: entertainment.title,
      place_id: place.id,
    }
    const action = await room_id ? updateRoom(room_id, form) : createRoom(form)
    onCreated(action.value)

    return action
  }

  render() {
    const { redux, buttonTitle } = this.props
    const { entertainments, loadEntertainments } = redux

    return (
      <Load promise={loadEntertainments}>
        {entertainments.map(entertainment =>
          <EntertainmentGroup
            buttonTitle={buttonTitle}
            key={entertainment.id}
            entertainment={entertainment}
            onIWantThis={this.newRoom}
          />
        )}
      </Load>
    )
  }
}

EntertainmentList.propTypes = {
  room_id: number,
  buttonTitle: string,
  onCreated: func,
  redux: shape({
    entertainments: array,
    loadEntertainments: func.isRequired,
  })
}

EntertainmentList.defaultProps = {
  onCreated: () => {}
}
const redux = state => ({
  entertainments: select.entertainments.all(state),
  loadEntertainments: actions.entertainments.loadMany,
  createRoom: actions.rooms.create,
  updateRoom: actions.rooms.update,
})

export default connect(redux)(EntertainmentList)
