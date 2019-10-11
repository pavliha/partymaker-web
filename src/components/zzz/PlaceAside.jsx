import React, { Fragment } from 'react'
import { object, string, oneOfType, number } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { PlaceActions, PlaceLoader } from 'components'
import FullscreenIcon from 'mdi-react/FullscreenIcon'

const styles = (theme) => ({
  root: {
    overflow: 'auto',
    borderLeft: '1px solid rgba(0,0,0,0.1)',
    display: 'none',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      display: 'inherit',
      width: 350,
    },
    [theme.breakpoints.up('md')]: {
      width: 600,
    },
  },

  asideHeader: {
    position: 'absolute',
    right: 15,
    top: 15,
  },

})

const PlaceAside = ({ classes, id }) =>
  <aside className={classes.root}>
    {id && (
      <Fragment>
        <header className={classes.asideHeader}>
          <Link to={`/places/${id}`}>
            <IconButton>
              <FullscreenIcon />
            </IconButton>
          </Link>
        </header>
        <PlaceLoader id={id} actions={<PlaceActions place_id={id} />} />
      </Fragment>
    )}
  </aside>

PlaceAside.propTypes = {
  classes: object.isRequired,
  id: oneOfType([number, string])
}

export default withStyles(styles)(PlaceAside)
