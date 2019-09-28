import React from 'react'
import { object, string, shape } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { PlaceActions, PlaceLoader } from 'components'
import FullscreenIcon from 'mdi-react/FullscreenIcon'

const styles = (theme) => ({
  root: {},

  aside: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex'
    },
    right: 0,
    flexDirection: 'column',
    top: 50,
    bottom: 0,
    overflow: 'auto',
    width: '35%',
    padding: 15,
    borderLeft: '1px rgba(0,0,0,0.1) solid'
  },

  asideHeader: {
    position: 'absolute',
    right: 15,
    top: 15,
  },

})

const EntertainmentPlaceScene = ({ classes, match }) =>
  <div className={classes.aside}>
    <header className={classes.asideHeader}>
      <Link to={`/places/${match.params.id}`}>
        <IconButton>
          <FullscreenIcon />
        </IconButton>
      </Link>
    </header>
    <PlaceLoader
      id={match.params.id}
      actions={<PlaceActions place_id={match.params.id} />}
    />
  </div>

EntertainmentPlaceScene.propTypes = {
  classes: object.isRequired,
  match: shape({
    params: shape({
      id: string,
    })
  })
}

export default withStyles(styles)(EntertainmentPlaceScene)
