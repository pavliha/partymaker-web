import React from 'react'
import { object, func, bool, number } from 'prop-types'
import { Drawer, withStyles } from '@material-ui/core'
import { EntertainmentList, CloseButton } from 'components'

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flex: 1,
    [theme.breakpoints.up('md')]: {
      width: 780,
    }
  },
  closeArea: {
    position: 'absolute',
    padding: '20px 0px 0 15px',
  },
  entertainments: {
    paddingLeft: 15,
    flex: 1,
  },
  title: {
    paddingLeft: 55,
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
        <div className={classes.closeArea}>
          <CloseButton onClick={onClose} />
        </div>
        <EntertainmentList
          room_id={room_id}
          classes={{ title: classes.title }}
          className={classes.entertainments}
          onCreated={onClose}
          buttonTitle="Выбрать"
        />
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
