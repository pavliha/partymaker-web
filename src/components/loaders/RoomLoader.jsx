import React from 'react'
import { func, bool, string, shape, number, oneOfType } from 'prop-types'
import { Loader, Room } from 'components'
import { actions, connect, select } from 'src/redux'
import { roomShape } from 'shapes/index'

const RoomLoader = ({ id, onJoin, onLeave, redux: { isGuest, room, loadRoom } }) =>
  <Loader load={loadRoom} params={id}>
    {room && (
      <Room
        room={room}
        isGuest={isGuest}
        onJoin={onJoin}
        onLeave={onLeave}
      />
    )}
  </Loader>

RoomLoader.propTypes = {
  id: oneOfType([number, string]),
  onJoin: func,
  onLeave: func,
  redux: shape({
    room: roomShape,
    isGuest: bool.isRequired,
    loadRoom: func.isRequired,
  })
}

const redux = (state, { id }) => ({
  room: select.rooms.current(state, id),
  isGuest: !select.rooms.guests.exist(state, id),
  loadRoom: actions.rooms.load,
})

export default connect(redux)(RoomLoader)
