import React, { Component } from 'react'
import { object, func, array, shape, string, number } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { connect, actions, select } from 'src/redux'
import { Load, EntertainmentGroup } from 'components'
import classNames from 'classnames'

const styles = {
  root: {
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {},
  title: {
    fontFamily: 'Google Sans,sans-serf',
    fontSize: 24,
  }
}

class EntertainmentList extends Component {

  newRoom = async (entertainment, place) => {
    const { redux: { createRoom, updateRoom }, onCreated, room_id } = this.props
    const form = {
      title: entertainment.title,
      place_id: place.id,
    }
    const action = await room_id ? updateRoom(room_id, form) : createRoom(form)
    onCreated(action.value)

    return action
  }

  render() {
    const { classes, className, redux, buttonTitle } = this.props
    const { entertainments, loadEntertainments } = redux

    return (
      <Load promise={loadEntertainments}>
        <section className={classNames(classes.root, className)}>
          <div className={classes.container}>
            <Typography className={classes.title} variant="h5">
              Что бы вы хотели сделать с друзьями?
            </Typography>

            {entertainments.map(entertainment =>
              <EntertainmentGroup
                buttonTitle={buttonTitle}
                key={entertainment.id}
                entertainment={entertainment}
                onIWantThis={this.newRoom}
              />
            )}

          </div>
        </section>
      </Load>
    )
  }
}

EntertainmentList.propTypes = {
  classes: object.isRequired,
  className: string,
  room_id: number,
  buttonTitle: string,
  onCreated: func,
  redux: shape({
    entertainments: array,
    loadEntertainments: func.isRequired,
  })
}

EntertainmentList.defaultProps = {
  onCreated: () => {}
}
const redux = state => ({
  entertainments: select.entertainments.all(state),
  loadEntertainments: actions.entertainments.loadMany,
  createRoom: actions.rooms.create,
  updateRoom: actions.rooms.update,
})

export default withStyles(styles)(connect(redux)(EntertainmentList))
