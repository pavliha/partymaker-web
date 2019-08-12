import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Header } from 'components'
import nightZP from './nightZP.png'
import phone from './phone.png'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },

  container: {
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
})

const IndexScene = () => {
  const classes = useStyles()

  return (
    <main className={classes.root}>
      <section className={classes.background}>
        <Header isTransparent />
        <div className={classes.container}>
          <div className={classes.title}>
            <Typography gutterBottom variant="h2">Partymaker</Typography>
            <Typography variant="h5">Здесь можно собрать друзей и найти куда сходить</Typography>
            <div className={classes.action}>
              <Link to="/auth/login">
                <Button variant="outlined" color="inherit" size="large" className={classes.button}>
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
    </main>
  )
}

export default IndexScene
