import React from 'react'
import { object } from 'prop-types'
import roomShape from 'shapes/room'
import { withStyles } from '@material-ui/styles'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const styles = {
  root: {
    borderRadius: 3,
    overflow: 'none',
    display: 'flex',
    border: '1px solid rgba(0,0,0,0.12)',
    marginBottom: 20,
  },
  picture: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    backgroundImage: (p) => `url(${p.room?.place?.picture_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: 182,
    height: 94,
  },
  container: {
    flex: 1,
    padding: 5,
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.54)'
  },
  actions: {
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
}

const RoomCard = ({ classes, room }) =>
  <div className={classes.root}>
    <Link to={`/rooms/${room.id}`}>
      <div className={classes.picture} />
    </Link>
    <div className={classes.container}>
      <Link to={`/rooms/${room.id}`}>
        {room.title
          ? <Typography className={classes.title}>{room.title}</Typography>
          : <Typography color="textSecondary" className={classes.title}>Что будем делать?</Typography>
        }
      </Link>
      <Typography className={classes.subtitle}>{room.place?.title || 'Место еще не выбрано'}</Typography>
    </div>
    <div className={classes.actions}>
      <Link to={`/rooms/${room.id}`}><Button>открыть</Button></Link>
    </div>
  </div>

RoomCard.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
}

export default withStyles(styles)(RoomCard)
