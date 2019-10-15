import React, { Component, Fragment } from 'react'
import { object, string, shape, func } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { formatCount } from 'utils'
import { Form, RoomTitleForm } from 'components'
import { connect, actions } from 'src/redux'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
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
    const { classes, room } = this.props
    const { isEditable } = this.state

    return (
      <div id="RoomTitle" className={classes.root}>
        {isEditable ? (
          <Form
            title={room.title}
            component={RoomTitleForm}
            onSubmit={this.changeTitle}
            onCancel={this.toggleEditable}
          />
        ) : (
          <Fragment>
            <div>
              <div className={classes.clickable} id="RoomTitle-toggle" onClick={this.toggleEditable}>
                {room.title
                  ? <Typography className={classes.title} variant="h5">{room.title}</Typography>
                  : <Typography color="textSecondary" variant="h5">Что будем делать?</Typography>
                }
              </div>
              <Typography color="textSecondary" variant="caption">
                {this.countPeople(room.guests?.length)}
              </Typography>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

RoomTitle.propTypes = {
  classes: object.isRequired,
  room: shape({
    title: string,
  }),
  redux: shape({
    updateRoom: func.isRequired,
  })
}

const redux = () => ({
  updateRoom: actions.rooms.update
})

export default withStyles(styles)(connect(redux)(RoomTitle))
