import React from 'react'
import { bool, func, object } from 'prop-types'
import { withStyles, Button, IconButton, Typography, Drawer } from '@material-ui/core'
import { GuestList, PlaceCard } from 'components'
import roomShape from 'shapes/room'
import KeyboardArrowRightIcon from 'mdi-react/KeyboardArrowRightIcon'
import PersonAddIcon from 'mdi-react/PersonAddIcon'

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

const RoomDrawer = ({ classes, room, isOpen, onClose }) =>
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
      <Button className={classes.action}>Выбрать другое место</Button>
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
  </Drawer>

RoomDrawer.propTypes = {
  classes: object.isRequired,
  isOpen: bool,
  onClose: func,
  room: roomShape
}

export default withStyles(styles)(RoomDrawer)
