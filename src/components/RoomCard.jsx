import React from 'react'
import { object } from 'prop-types'
import roomShape from 'shapes/room'
import { Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { DateTimeStatus, CloseButton } from 'components'
import { formatCount } from 'utils'

const styles = theme => ({
  root: {
    position: 'relative',
    borderRadius: 3,
    overflow: 'none',
    display: 'flex',
    marginBottom: 20,
    flexDirection: 'row',
  },
  picture: {
    marginLeft: 5,
    marginTop: 5,
    backgroundColor: 'rgba(0,0,0,0.12)',
    backgroundImage: (p) => `url(${p.room?.place?.picture_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 5,
    paddingLeft: 15,
    [theme.breakpoints.up('sm')]: {
      marginRight: 100,

    },
  },
  title: {
    fontSize: 18,
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    }
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.54)'
  },
  actions: {
    position: 'absolute',
    top: -5,
    right: 5,
  }
})

const RoomCard = ({ classes, room }) => {
  const count = room.guest_count

  const format = formatCount({
    few: 'учасников',
    one: 'участник',
    two: 'участника'
  })

  return (
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
        <DateTimeStatus className={classes.subtitle} date={room.date} time={room.time} />
        {count &&
        <Typography align="right" color="textSecondary" variant="caption">
          {count} {format(count)}
        </Typography>
        }
      </div>
      <div className={classes.actions}>
        <Link to={`/rooms/${room.id}/leave`}><CloseButton /></Link>
      </div>
    </div>
  )
}

RoomCard.propTypes = {
  classes: object.isRequired,
  room: roomShape.isRequired,
}

export default withStyles(styles)(RoomCard)
