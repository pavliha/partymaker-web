import React, { Component } from 'react'
import { object, func, arrayOf, shape } from 'prop-types'
import roomShape from 'shapes/room'
import { Typography, Button, withStyles } from '@material-ui/core'
import { actions, connect, select } from 'src/redux'
import { Load, RoomCard } from 'components'

const styles = theme => ({

  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    maxWidth: 700,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
    marginBottom: '30px',
  },

  companyLabel: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    }
  }
})

class RoomsScene extends Component {

  createRoom = async () => {
    const { redux: { createRoom } } = this.props
    await createRoom()
  }

  render() {
    const { classes, redux } = this.props
    return (
      <div className={classes.root}>
        <Load promise={redux.loadRooms}>
          <div className={classes.container}>
            <div className={classes.actions}>
              <Typography variant="h5">
                Мои компании
              </Typography>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.createRoom}
                >
                  собрать <span className={classes.companyLabel}>компанию</span>
                </Button>
              </div>
            </div>
            {redux.rooms.map(room =>
              <RoomCard key={room.id} room={room} />
            )}
          </div>
        </Load>
      </div>
    )
  }
}

RoomsScene.propTypes = {
  classes: object.isRequired,
  redux: shape({
    rooms: arrayOf(roomShape).isRequired,
    loadRooms: func.isRequired,
  })
}

const redux = state => ({
  rooms: select.rooms.all(state),
  loadRooms: actions.rooms.loadMany,
  createRoom: actions.rooms.create,
})

export default withStyles(styles)(connect(redux)(RoomsScene))
