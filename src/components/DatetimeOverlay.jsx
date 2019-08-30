import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { withStyles, IconButton } from '@material-ui/core'
import CalendarClockIcon from 'mdi-react/CalendarClockIcon'
import CheckIcon from 'mdi-react/CheckIcon'
import { CloseButton } from 'components'
import DatetimeForm from 'containers/@rooms/@id/Chat/ChatForm/DatetimeForm'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: 72,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'content-box',
    padding: '0px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },
  icon: {
    marginRight: 10,
    marginLeft: 3,
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  checkButton: {
    marginLeft: 20,
    marginRight: 5,
  }
})

class DatetimeOverlay extends Component {

  submit = () => {

  }

  render() {
    const { classes, onClose } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <IconButton disabled className={classes.icon}>
            <CalendarClockIcon />
          </IconButton>
          <DatetimeForm onSubmit={this.submit} />
        </div>
        <CloseButton
          color="textSecondary"
          onClick={onClose}
        />
        <IconButton
          className={classes.checkButton}
          color="primary"
          type="submit"
        >
          <CheckIcon />
        </IconButton>
      </div>
    )
  }
}

DatetimeOverlay.propTypes = {
  classes: object.isRequired,
  onClose: func.isRequired,
}

export default withStyles(styles)(DatetimeOverlay)
