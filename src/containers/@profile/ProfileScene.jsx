import React, { Component } from 'react'
import { object, func, arrayOf, shape } from 'prop-types'
import roomShape from 'shapes/room'
import { Typography, Button, withStyles } from '@material-ui/core'
import { actions, connect, select } from 'src/redux'
import { Load, Profile, RoomCard, AppBottomNavigation } from 'components'
import userShape from 'shapes/user'

const styles = theme => ({

  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  container: {
    maxWidth: 700,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
    paddingTop: 30,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
    marginBottom: '30px',
  },

  rooms: {
    flex: 1,
    marginTop: 15,
    marginBottom: 100,
  },
  newRoom: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inherit'
    }
  }
})

class ProfileScene extends Component {

  componentDidMount() {
    const { redux: { loadAccount } } = this.props
    loadAccount()
  }

  createRoom = async () => {
    const { history, redux: { createRoom } } = this.props
    const action = await createRoom()
    history.push(`/rooms/${action.value.id}/entertainments`)
  }

  render() {
    const { classes, redux } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Profile user={redux.user} />
          <Load promise={redux.loadRooms}>
            <div className={classes.rooms}>
              <div className={classes.actions}>
                <Typography variant="h5">
                  Мои компании
                </Typography>
                <div>
                  <Button
                    className={classes.newRoom}
                    color="primary"
                    variant="contained"
                    onClick={this.createRoom}
                  >
                    собрать компанию
                  </Button>
                </div>
              </div>
              {redux.rooms.map(room =>
                <RoomCard key={room.id} room={room} />
              )}
            </div>
          </Load>
          <AppBottomNavigation />
        </div>
      </div>
    )
  }
}

ProfileScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  redux: shape({
    user: userShape.isRequired,
    loadAccount: func.isRequired,
    rooms: arrayOf(roomShape).isRequired,
    loadRooms: func.isRequired,
  })
}

const redux = state => ({
  user: select.auth.user(state),
  loadAccount: actions.auth.user.account.load,
  rooms: select.rooms.all(state),
  loadRooms: actions.rooms.loadMany,
  createRoom: actions.rooms.create,
})

export default withStyles(styles)(connect(redux)(ProfileScene))
