import React from 'react'
import { object, string, shape, node } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { formatCount } from 'utils'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px 30px 20px',
  },
}

const RoomTitle = ({ classes, room, action }) => {
  const count = room.guests?.length

  const format = formatCount({
    few: 'Учасников',
    one: 'Участник',
    two: 'Участника'
  })

  return <div className={classes.root}>
    <div>
      {room.title
        ? <Typography variant="h5">{room.title}</Typography>
        : <Typography color="textSecondary" variant="h5">Что будем делать?</Typography>
      }
      <Typography color="textSecondary" variant="caption">
        {count} {format(count)}
      </Typography>
    </div>
    <div>
      {action}
    </div>
  </div>
}

RoomTitle.propTypes = {
  classes: object.isRequired,
  room: shape({
    title: string,
  }),
  action: node,
}

export default withStyles(styles)(RoomTitle)
