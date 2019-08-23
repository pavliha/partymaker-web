import React, { Component } from 'react'
import { object, func, array, shape } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { connect, actions, select } from 'src/redux'
import { Load } from 'components'
import Entertainment from './Entertainment'

const styles = {
  root: {
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    maxWidth: 1100,
  },
  title: {
    fontFamily: 'Google Sans,sans-serf',
    fontSize: 24,
  }
}

class Entertainments extends Component {

  newRoom = async (entertainment, place) => {
    const { redux: { createRoom }, onCreated } = this.props
    const action = await createRoom({
      title: entertainment.title,
      place_id: place.id,
    })

    onCreated(action.value)

    return action
  }

  render() {
    const { classes, redux: { entertainments, loadEntertainments } } = this.props
    return (
      <Load promise={loadEntertainments}>
        <section className={classes.root}>
          <div className={classes.container}>
            <Typography className={classes.title} variant="h5">
              Что бы вы хотели сделать с друзьями?
            </Typography>

            {entertainments.map(entertainment =>
              <Entertainment
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

Entertainments.propTypes = {
  classes: object.isRequired,
  onCreated: func.isRequired,
  redux: shape({
    entertainments: array,
    loadEntertainments: func.isRequired,
  })
}
const redux = state => ({
  entertainments: select.entertainments.all(state),
  loadEntertainments: actions.entertainments.loadMany,
  createRoom: actions.rooms.create
})

export default withStyles(styles)(connect(redux)(Entertainments))
