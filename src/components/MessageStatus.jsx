import React from 'react'
import { object, bool, string, shape, number, oneOfType } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import moment from 'moment/moment'
import TimerIcon from 'mdi-react/TimerIcon'
import DoneAllIcon from 'mdi-react/DoneAllIcon'
import CheckIcon from 'mdi-react/CheckIcon'

const styles = theme => ({
  root: {
    marginLeft: 5,
    fontSize: 11,
    display: 'flex',
    alignItems: 'center'
  },
  check: {
    marginLeft: 3,
    color: theme.palette.text.secondary,
    width: 16,
    height: 16,
  },
  isMine: {
    justifyContent: 'flex-end'
  }
})

const MessageStatus = ({ className, classes, message }) =>
  <div
    className={classNames({
      [classes.root]: true,
      [classes.isMine]: message.isMine,
      [className]: true,
    })}>
    <Typography color="textSecondary" component="div" variant="caption">
      {moment(message.created_at, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')}
    </Typography>
    {message.isMine && (
      <>
        {message.isLoading && <TimerIcon className={classes.check} />}
        {!(Boolean(message.is_read) || message.isLoading) && <CheckIcon className={classes.check} />}
        {Boolean(message.is_read) && <DoneAllIcon className={classes.check} />}
      </>
    )}
  </div>

MessageStatus.propTypes = {
  classes: object.isRequired,
  className: string,
  message: shape({
    isMine: bool,
    is_read: oneOfType([number, bool]),
    isLoading: bool,
    created_at: string,
  }).isRequired,
}

export default withStyles(styles)(MessageStatus)
