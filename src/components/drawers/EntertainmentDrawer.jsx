import React, { Fragment } from 'react'
import { bool, func, object, shape } from 'prop-types'
import { Drawer, Typography, withStyles } from '@material-ui/core'
import { BackButton, Loader, PlacesList } from 'components'
import { entertainmentShape } from 'shapes/index'
import { actions, connect, select } from 'src/redux'

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    padding: 0,
    boxSizing: 'border-box',
    flexDirection: 'column',
    flex: 1,

  },

  container: {
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '785px',
      padding: 15,
    },
    height: '100%',
    paddingLeft: 25,
  },

  places: {
    flex: 1,
    paddingTop: 35,
    overflow: 'auto',
    display: 'inline-block',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: 30,
    }
  },

  title: {
    paddingLeft: 5,
    fontSize: 20,
  },

  heading: {
    marginLeft: 20,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  }

})

const EntertainmentDrawer = ({ classes, isOpen, onClose, onSelect, redux: { entertainment, loadEntertainment } }) =>
  <Drawer
    anchor="right"
    open={isOpen}
    onClose={onClose}
  >
    <section className={classes.container}>
      <Loader load={loadEntertainment}> {entertainment && (
        <Fragment>
          <div className={classes.heading}>
            <BackButton onClick={onClose} />
            <Typography component="div" className={classes.title}>
              {entertainment.title}
            </Typography>
          </div>
          <PlacesList
            className={classes.places}
            places={entertainment.places}
            onSelect={onSelect}
          />
        </Fragment>
      )}</Loader>
    </section>
  </Drawer>

EntertainmentDrawer.propTypes = {
  classes: object.isRequired,
  isOpen: bool.isRequired,
  onSelect: func.isRequired,
  onClose: func.isRequired,
  redux: shape({
    entertainment: entertainmentShape,
    loadEntertainment: func,
  })
}

const redux = (state, { entertainment }) => ({
  entertainment: select.entertainments.current(state, entertainment.id),
  loadEntertainment: () => actions.entertainments.load(entertainment.id)
})

export default connect(redux)(withStyles(styles)(EntertainmentDrawer))
