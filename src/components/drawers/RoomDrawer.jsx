import React, { Component } from 'react'
import { bool, func, object, shape } from 'prop-types'
import { withStyles, Button, IconButton, Typography, Drawer } from '@material-ui/core'
import { GuestList, PlaceCard, EntertainmentsDrawer, EntertainmentDrawer } from 'components'
import roomShape from 'shapes/room'
import KeyboardArrowRightIcon from 'mdi-react/KeyboardArrowRightIcon'
import PersonAddIcon from 'mdi-react/PersonAddIcon'
import { actions, connect } from 'src/redux'

const styles = {
  root: {
    position: 'relative',
    borderLeft: '1px solid rgba(0,0,0,0.1)',
  },

  place: {
    paddingTop: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actions: {
    marginTop: 30,
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  action: {
    height: 45,
    borderTop: '1px solid rgba(0,0,0,0.1)',
    width: '100%',
  },
  hideIcon: {
    marginTop: 10,
    left: 5,
    position: 'absolute',
  },
  addPerson: {
    marginLeft: 10,
    fontFamily: 'Google Sans',
    fontWeight: 500,
  },
  addGuest: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 20,
  },
  guests: {
    marginTop: 30,
  }
}

class RoomDrawer extends Component {

  state = {
    isEntertainmentDrawerOpen: true,
    isEntertainmentsDrawerOpen: false,
    entertainment: null,
  }

  openEntertainmentsDrawer = () =>
    this.setState({ isEntertainmentsDrawerOpen: true })

  closeEntertainmentsDrawer = () =>
    this.setState({ isEntertainmentsDrawerOpen: false })

  openEntertainmentDrawer = entertainment =>
    this.setState({ isEntertainmentDrawerOpen: true, entertainment })

  closeEntertainmentDrawer = () =>
    this.setState({ isEntertainmentDrawerOpen: false, entertainment: null })

  updateRoomPlace = place => {
    const { room, redux: { updateRoom } } = this.props
    updateRoom(room.id, { place_id: place.id })
    this.closeEntertainmentsDrawer()
    this.closeEntertainmentDrawer()
  }

  render() {
    const { classes, room, isOpen, onClose } = this.props
    const { isEntertainmentsDrawerOpen, isEntertainmentDrawerOpen, entertainment } = this.state

    return (
      <Drawer
        variant="persistent"
        anchor="right"
        open={isOpen}
        className={classes.root}
      >
        <IconButton className={classes.hideIcon} onClick={onClose}>
          <KeyboardArrowRightIcon />
        </IconButton>
        <section className={classes.place}>
          <PlaceCard
            place={room?.place}
            action={room?.place && <Button>Сменить</Button>}
          />
        </section>
        <section className={classes.actions}>
          <Button className={classes.action} onClick={this.openEntertainmentsDrawer}>Выбрать другое место</Button>
          <Button className={classes.action}>Покинуть компанию</Button>
        </section>
        {room?.guests && (
          <section className={classes.guests}>
            <div className={classes.addGuest}>
              <PersonAddIcon /><Typography className={classes.addPerson}>Добавить участника</Typography>
            </div>
            <GuestList guests={room?.guests} />
          </section>
        )}
        <EntertainmentsDrawer
          isOpen={isEntertainmentsDrawerOpen}
          onSelect={this.updateRoomPlace}
          onExpand={this.openEntertainmentDrawer}
          onClose={this.closeEntertainmentsDrawer}
        />
        {entertainment && (
          <EntertainmentDrawer
            entertainment={entertainment}
            isOpen={isEntertainmentDrawerOpen}
            onSelect={this.updateRoomPlace}
            onClose={this.closeEntertainmentDrawer}
          />
        )}
      </Drawer>
    )
  }
}

RoomDrawer.propTypes = {
  classes: object.isRequired,
  isOpen: bool,
  onClose: func,
  room: roomShape,
  redux: shape({
    updateRoom: func
  })
}

const redux = () => ({
  updateRoom: actions.rooms.update,
})

export default withStyles(styles)(connect(redux)(RoomDrawer))
