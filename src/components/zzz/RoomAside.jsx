import React from 'react'
import { object } from 'prop-types'
import { withStyles, Button, IconButton, Typography } from '@material-ui/core'
import { GuestList } from 'components'
import roomShape from 'shapes/room'
import KeyboardArrowRightIcon from 'mdi-react/KeyboardArrowRightIcon'
import PlaceCard from 'components/cards/PlaceCard'
import PersonAddIcon from 'mdi-react/PersonAddIcon'

const styles = {
  root: {
    position: 'relative',
    width: 350,
    borderLeft: '1px solid rgba(0,0,0,0.1)',
    paddingTop: 10,
  },

  place: {
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

const RoomAside = ({ classes, room }) => {
  return <div className={classes.root}>
    <IconButton className={classes.hideIcon}>
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
  </div>
}

RoomAside.propTypes = {
  classes: object.isRequired,
  room: roomShape
}

export default withStyles(styles)(RoomAside)
