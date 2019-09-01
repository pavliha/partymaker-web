import React, { Component } from 'react'
import { shape, object, func } from 'prop-types'
import { Header, EntertainmentList } from 'components'
import nightZP from './nightZP.png'
import phone from './phone.png'
import { Typography, Button, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { select, connect } from 'src/redux'
import userShape from 'shapes/user'

const styles = {
  root: {
    flexGrow: 1,
  },

  banner: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  background: {
    position: 'relative',
    background: `url(${nightZP}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 940,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: 'white',
    maxWidth: 340,
  },
  button: {
    borderRadius: '30px',
    minWidth: '250px',
  },

  action: {
    marginTop: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: 1130,
    margin: '0 auto',
  }
}

class IndexScene extends Component {

  redirectToRoom = (room) => {
    const { history } = this.props
    history.push(`/rooms/${room.id}`)
  }

  render() {
    const { classes, redux: { user } } = this.props

    return (
      <main className={classes.root}>
        <section className={classes.background}>
          <Header isTransparent user={user} />
          <div className={classes.banner}>
            <div className={classes.title}>
              <Typography gutterBottom variant="h2">Partymaker</Typography>
              <Typography variant="h5">Здесь можно собрать друзей и найти куда сходить</Typography>
              <div className={classes.action}>
                <Link to="/auth/login">
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    className={classes.button}
                  >
                    Начать
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img alt="screenshot" src={phone} />
            </div>
          </div>
        </section>
        <section className={classes.container}>
          <EntertainmentList onCreated={this.redirectToRoom} />
        </section>
      </main>
    )
  }
}

IndexScene.propTypes = {
  classes: object,
  history: shape({ push: func }),
  redux: shape({ user: userShape })
}

const redux = state => ({
  user: select.auth.user(state)
})

export default withStyles(styles)(connect(redux)(IndexScene))
