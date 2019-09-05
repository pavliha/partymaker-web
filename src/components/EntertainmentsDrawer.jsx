import React from 'react'
import { object, func, bool, number } from 'prop-types'
import { Drawer, Typography, withStyles } from '@material-ui/core'
import { EntertainmentList, CloseButton } from 'components'

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    padding: 15,
    flexDirection: 'column',
    flex: 1,
    [theme.breakpoints.up('md')]: {
      width: '760px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1130px',
    }
  },

  header: {
    display: 'flex',
    alignItems: 'center',
  },

  entertainments: {
    flex: 1,
  },

  title: {
    paddingLeft: 15,
  }
})

const EntertainmentsDrawer = ({ classes, room_id, isOpen, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
    >
      <div className={classes.root}>
        <header className={classes.header}>
          <CloseButton onClick={onClose} />
          <Typography className={classes.title} variant="h5">
            Куда бы вы хотели сходить с друзьями?
          </Typography>
        </header>
        <div>
          <EntertainmentList
            room_id={room_id}
            classes={{ title: classes.title }}
            className={classes.entertainments}
            onCreated={onClose}
            buttonTitle="Выбрать"
          />
        </div>
      </div>
    </Drawer>
  )
}

EntertainmentsDrawer.propTypes = {
  classes: object.isRequired,
  room_id: number,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
}

export default withStyles(styles)(EntertainmentsDrawer)
