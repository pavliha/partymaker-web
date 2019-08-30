import React from 'react'
import { object, func, bool } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import KeyboardArrowRightIcon from 'mdi-react/KeyboardArrowRightIcon'

const styles = {
  root: {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    alignItems: 'center',
    padding: 5,
  },
  action: {
    margin: '0 5px'
  },
  actionLabel: {
    paddingLeft: 5,
    marginTop: 1,
  },
  arrow: {
    color: 'rgba(0, 0, 0, 0.12)'
  }
}

const ChatFormActions = ({ classes, isMultipleGuests, isTimeSelected, onInvite, onTime, onOrder }) =>
  <div className={classes.root}>
    <Button
      color="primary"
      className={classes.actionLabel}
      onClick={onInvite}
    >
      Пригласить друзей
    </Button>
    <KeyboardArrowRightIcon className={classes.arrow} />
    <Button
      color="primary" disabled={!isMultipleGuests}
      className={classes.actionLabel}
      onClick={onTime}
    >
      Выбрать время
    </Button>
    <KeyboardArrowRightIcon className={classes.arrow} />
    <Button
      color="primary"
      disabled={!isTimeSelected}
      className={classes.actionLabel}
      onClick={onOrder}
    >
      Заказать
    </Button>
  </div>
ChatFormActions.propTypes = {
  classes: object.isRequired,
  isMultipleGuests: bool,
  isTimeSelected: bool,
  onInvite: func.isRequired,
  onTime: func.isRequired,
  onOrder: func.isRequired,

}

export default withStyles(styles)(ChatFormActions)
