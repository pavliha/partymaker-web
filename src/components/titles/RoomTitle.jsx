import React, { Component } from 'react'
import { object, string, shape, node, func } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { formatCount } from 'utils'
import { Form, RoomTitleForm } from 'components'
import { connect, actions } from 'src/redux'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px 30px 20px',
  },
  title: {
    fontSize: '1.3rem',
  },
  clickable: {
    cursor: 'pointer'
  }
}

class RoomTitle extends Component {

  state = {
    isEditable: false
  }

  countPeople = (count) => {
    const format = formatCount({
      few: 'Учасников',
      one: 'Участник',
      two: 'Участника'
    })

    return `${count} ${format(count)}`
  }

  toggleEditable = () =>
    this.setState((state) => ({ isEditable: !state.isEditable }))

  changeTitle = ({ title }) => {
    const { room, redux: { updateRoom } } = this.props
    updateRoom(room.id, { title })
    this.toggleEditable()
  }

  render() {
    const { classes, room, action } = this.props
    const { isEditable } = this.state

    return (
      <div id="RoomTitle" className={classes.root}>
        <div>
          {isEditable ? (
            <div>
              <Form
                title={room.title}
                component={RoomTitleForm}
                onSubmit={this.changeTitle}
                onCancel={this.toggleEditable}
              />
            </div>
          ) : (
            <div className={classes.clickable} onClick={this.toggleEditable}>
              {room.title
                ? <Typography className={classes.title} variant="h5">{room.title}</Typography>
                : <Typography color="textSecondary" variant="h5">Что будем делать?</Typography>
              }
            </div>
          )}
          <Typography color="textSecondary" variant="caption">
            {this.countPeople(room.guests?.length)}
          </Typography>
        </div>
        <div>
          {action}
        </div>
      </div>
    )
  }
}

RoomTitle.propTypes = {
  classes: object.isRequired,
  room: shape({
    title: string,
  }),
  action: node,
  redux: shape({
    updateRoom: func.isRequired,
  })
}

const redux = () => ({
  updateRoom: actions.rooms.update
})

export default withStyles(styles)(connect(redux)(RoomTitle))
