import React from 'react'
import { object, func, arrayOf, shape } from 'prop-types'
import roomShape from 'shapes/room'
import { withStyles } from '@material-ui/styles'
import { Typography, Button } from '@material-ui/core'
import RoomCard from './RoomCard'
import { actions, connect, select } from 'src/redux'
import { Load } from 'components'

const styles = {
  root: {
    maxWidth: 700,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
    marginBottom: '30px',
  }
}

const RoomsScene = ({ classes, redux }) =>
  <Load promise={redux.loadRooms}>
    <div className={classes.root}>
      <div className={classes.actions}>
        <Typography gutterBottom variant="h5">
          Мои компании
        </Typography>
        <Button
          color="primary"
          variant="contained"
        >
          собрать компанию
        </Button>
      </div>
      {redux.rooms.map(room =>
        <RoomCard key={room.id} room={room} />
      )}
    </div>
  </Load>

RoomsScene.propTypes = {
  classes: object.isRequired,
  redux: shape({
    rooms: arrayOf(roomShape).isRequired,
    loadRooms: func.isRequired,
  })
}

const redux = state => ({
  rooms: select.rooms.list(state),
  loadRooms: actions.rooms.loadMany
})

export default withStyles(styles)(connect(redux)(RoomsScene))
