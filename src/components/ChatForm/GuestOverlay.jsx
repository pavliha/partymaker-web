import React from 'react'
import { object, func } from 'prop-types'
import { IconButton, withStyles, Button } from '@material-ui/core'
import FaceIcon from 'mdi-react/SentimentVerySatisfiedIcon'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: 72,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 20,
    boxSizing: 'content-box',
    fontWeight: 400,
  },
  container: {
    flex: 1,
    paddingLeft: 15,
    opacity: '0.2'
  },

  icon: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  }

})

const GuestOverlay = ({ classes, onJoin }) =>
  <div className={classes.root}>
    <IconButton className={classes.icon} disabled>
      <FaceIcon />
    </IconButton>
    <div className={classes.container}>
      Что бы начать писать присоденись к компании
    </div>
    <Button color="primary" onClick={onJoin}>Присоеденится</Button>
  </div>

GuestOverlay.propTypes = {
  classes: object.isRequired,
  onJoin: func.isRequired,
}

export default withStyles(styles)(GuestOverlay)
