import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { userShape } from 'shapes'
import { EntertainmentsLoader, ProfileHeader, AppBottomNavigation, EntertainmentsSearch } from 'components'
import { select, connect } from 'src/redux'
import { Helmet } from 'react-helmet'

const styles = theme => ({
  container: {
    maxWidth: 960,
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
  searchArea: {
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 25,
    paddingBottom: 30,
  }
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
        <Helmet>
          <title>Partymaker - Поиск развлечений</title>
        </Helmet>
        <ProfileHeader user={user} />
        <section className={classes.container}>
          <div className={classes.searchArea}>
            <EntertainmentsSearch />
          </div>
          <div className={classes.list}>
            <EntertainmentsLoader
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
