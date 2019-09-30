import React, { Fragment } from 'react'
import { object, string, shape } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { PlaceActions, PlaceLoader } from 'components'
import FullscreenIcon from 'mdi-react/FullscreenIcon'

const styles = () => ({
  asideHeader: {
    position: 'absolute',
    right: 15,
    top: 15,
  },

})

const EntertainmentPlaceScene = ({ classes, match }) =>
  <Fragment>
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
  </Fragment>

EntertainmentPlaceScene.propTypes = {
  classes: object.isRequired,
  match: shape({
    params: shape({
      id: string,
    })
  })
}

export default withStyles(styles)(EntertainmentPlaceScene)
