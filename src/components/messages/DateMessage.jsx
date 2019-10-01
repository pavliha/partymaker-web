import React, { Component } from 'react'
import { func, object, shape } from 'prop-types'
import { Button, Typography, withStyles } from '@material-ui/core'
import messageShape from 'shapes/message'
import MessageStatus from './MessageStatus'
import moment from 'moment'
import DateDialog from '../dialogs/DateDialog'
import { connect, actions } from 'src/redux'

const styles = () => ({
  root: {
    boxShadow: '2px 2px 3px -1px rgba(156, 169, 189, 0.3)',
    padding: 15,
    width: 300,
    height: 250,
    color: 'white',
    overflow: 'hidden',
    backgroundSize: 'cover',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textShadow: '0 3px 6px #000000',
    color: 'white'
  },
  address: {
    textShadow: '0 3px 6px #000000',
    color: 'white',
    marginBottom: 20,
  },
  content: {
    zIndex: 10,
    textAlign: 'center'
  },
})

class DateMessage extends Component {

  state = {
    isModalOpen: false,
  }

  openModal = () =>
    this.setState({ isModalOpen: true, })

  closeModal = () =>
    this.setState({ isModalOpen: false, })

  changeDate = async () => {
    const { redux: { updateRoom }, message: { room_id, date, time } } = this.props
    await updateRoom(room_id, { date, time })
    this.closeModal()
  }

  render() {
    const { classes, message } = this.props
    const { isModalOpen } = this.state
    const background_url = '/images/sparks.png'
    const backgroundImage = background_url && `url(${background_url})`

    return (
      <div>
        <div className={classes.root} style={{ backgroundImage }}>
          <div className={classes.content}>
            <Typography className={classes.title} variant="h5">Предложеная дата</Typography>
            <Typography gutterBottom variant="body1" className={classes.address}>
              {moment(message.date).format('D MMMM, dddd')} {message.time}
            </Typography>
            {(message.date === message.room.date) && (message.time === message.room.time)
              ? <Typography color="inherit">Выбраная дата</Typography>
              : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.openModal}
                  size="small"
                >
                  Выбрать
                </Button>
              )}
          </div>
        </div>
        <DateDialog
          date={message.date}
          isOpen={isModalOpen}
          onCancel={this.closeModal}
          onConfirm={this.changeDate}
        />
        <MessageStatus message={message} />
      </div>
    )
  }
}

DateMessage.propTypes = {
  classes: object.isRequired,
  message: messageShape.isRequired,
  redux: shape({
    updateRoom: func.isRequired,
  }),
}

const redux = () => ({
  updateRoom: actions.rooms.update
})

export default withStyles(styles)(connect(redux)(DateMessage))
