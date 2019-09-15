import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { userShape } from 'shapes'
import { EntertainmentList, Header, AppBottomNavigation } from 'components'
import { select, connect } from 'src/redux'

const styles = theme => ({
  container: {
    maxWidth: 1130,
    margin: '0 auto',
  },
  entertainmentTitle: {
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: 'Google Sans,sans-serf',
    fontSize: 24,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
})

class EntertainmentsScene extends Component {

  redirectToRoom = (room) => {
    const { history } = this.props
    history.push(`/rooms/${room.id}`)
  }

  render() {
    const { classes, redux: { user } } = this.props
    return (
      <div>
        <Header user={user} />
        <section className={classes.container}>
          <Typography className={classes.entertainmentTitle} variant="h5">
            Что бы вы хотели сделать с друзьями?
          </Typography>
          <div className={classes.list}>
            <EntertainmentList
              onCreated={this.redirectToRoom}
              buttonTitle="Хочу сюда"
            />
          </div>
        </section>
        <AppBottomNavigation />
      </div>
    )
  }
}

EntertainmentsScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  redux: shape({
    user: userShape,
  })
}

const redux = state => ({
  user: select.auth.user(state)
})

export default withStyles(styles)(connect(redux)(EntertainmentsScene))
