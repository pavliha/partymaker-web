import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import { connect } from 'utils'
import { actions, select } from 'src/redux'
import { withRouter } from 'react-router-dom'

const styles = {
  root: {},
  primary: {
    marginRight: 20,
  }
}

class PlaceActions extends Component {

  createRoom = async () => {
    const { history, redux: { place, createRoom } } = this.props

    const action = await createRoom({
      title: place.entertainment.title,
      place_id: place.id
    })

    history.push(`/rooms/${action.value.id}`)

    return action
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Button
          className={classes.primary}
          color="primary"
          variant="contained"
          onClick={this.createRoom}
        >
          Хочу сходить
        </Button>
        <Button>Заказать</Button>
      </div>
    )
  }
}

PlaceActions.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  redux: shape({
    createRoom: func.isRequired,
  })
}

const redux = (state, { place_id: id }) => ({
  place: select.places.current(state, id),
  createRoom: actions.rooms.create
})
export default withStyles(styles)(connect(redux)(withRouter(PlaceActions)))
