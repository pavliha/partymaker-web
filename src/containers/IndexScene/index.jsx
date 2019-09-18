import React, { Component } from 'react'
import { shape, object, func } from 'prop-types'
import { TransparentHeader, EntertainmentsLoader } from 'components'
import nightZP from './nightZP.png'
import phone from './phone.png'
import { Typography, Button, withStyles, SvgIcon } from '@material-ui/core'
import { select, connect } from 'src/redux'
import userShape from 'shapes/user'
import KeyboardArrowDownIcon from 'mdi-react/KeyboardArrowDownIcon'
import classNames from 'classnames'
import { Helmet } from 'react-helmet'

const styles = theme => ({
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
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    marginTop: 150,
    color: 'white',
    maxWidth: 340,
    textShadow: '1px 1px 2px black',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  button: {
    borderRadius: '30px',
    minWidth: '250px',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  },

  action: {
    marginTop: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: 1130,
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      padding: '0 15px',
    }
  },
  screenshot: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    }
  },
  entertainmentTitle: {
    paddingTop: 60,
    paddingBottom: 40,
    fontFamily: 'Google Sans,sans-serf',
    fontSize: 24,
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left'
    }
  },
  arrowDown: {
    cursor: 'pointer',
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    animationDuration: '2s',
    animationIterationCount: 3,
    transformOrigin: 'bottom',
  },
})

class IndexScene extends Component {

  placesRef = React.createRef()

  redirectToRoom = (room) => {
    const { history } = this.props
    history.push(`/rooms/${room.id}`)
  }

  scrollToPlaces = () => {
    const element = this.placesRef
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  render() {
    const { classes, redux: { user } } = this.props

    return (
      <main className={classes.root}>
        <Helmet>
          <title>Partymaker - Здесь можно найти где погулать с друзями</title>
        </Helmet>
        <section className={classes.background}>
          <TransparentHeader user={user} />
          <div className={classes.banner}>
            <div className={classes.title}>
              <Typography gutterBottom variant="h2">Partymaker</Typography>
              <Typography variant="h5">Здесь можно собрать друзей и найти куда сходить</Typography>
              <div className={classes.action}>
                <div>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    className={classes.button}
                    onClick={this.scrollToPlaces}
                  >
                    Начать
                  </Button>
                  <div className={classNames([classes.arrowDown, 'animate-bounce'])}>
                    <div>
                      <SvgIcon
                        onClick={this.scrollToPlaces}
                        className="animate-bounce"
                        fontSize="large"
                      >
                        <KeyboardArrowDownIcon />
                      </SvgIcon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.screenshot}>
              <img alt="screenshot" src={phone} />
            </div>
          </div>
        </section>
        <section ref={(ref) => { this.placesRef = ref }} className={classes.container}>
          <Typography className={classes.entertainmentTitle} variant="h5">
            Что бы вы хотели сделать с друзьями?
          </Typography>
          <EntertainmentsLoader />
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
