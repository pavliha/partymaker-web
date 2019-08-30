import React from 'react'
import { object, func, bool } from 'prop-types'
import { Button, Dialog, Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture, CloseButton } from 'components'

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  picture: {
    borderRadius: 0,
    width: 500,
    height: 300,
  },
  header: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
  },
  container: {
    padding: 15,
  },
  secondaryButton: {
    color: 'rgba(0,0,0,0.54)'
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  secondaryActions: {
    flex: 1
  },
  info: {
    padding: 15,
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },
  infoItem: {
    textAlign: 'center',
    maxWidth: 130,
  },

  orderButton: {
    marginRight: 20,
    color: 'rgba(0,0,0,0.54)',
  }
}

const PlaceDialog = ({ classes, place, isOpen, onClose, onReplace }) =>
  <Dialog
    open={isOpen}
    onClose={onClose}
  >
    <div className={classes.root}>
      <header className={classes.header}>
        <Typography variant="h5">{place.entertainment.title}</Typography>
        <CloseButton onClick={onClose} />
      </header>
      <Picture src={place.picture_url} className={classes.picture} />
      <div className={classes.container}>
        <div>
          <Typography className={classes.title}>
            {place.title}
          </Typography>
          <Typography color="textSecondary">
            {place.working_hours}
          </Typography>
        </div>
        <div className={classes.actions}>
          <div className={classes.secondaryActions}>
            <a target="_blank" href={place.website_url}>
              <Button className={classes.secondaryButton}>САЙТ</Button>
            </a>
            <a target="_blank" href={place.map_url}>
              <Button className={classes.secondaryButton}>КАРТА</Button>
            </a>
          </div>
          <Button className={classes.orderButton}>Заказать</Button>
          <Button variant="outlined" color="primary" onClick={onReplace}>
            Выбрать другое
          </Button>
        </div>
        <div className={classes.info}>
          <div className={classes.infoItem}>
            <Typography variant="subtitle1">
              Номер телефона
            </Typography>
            <Typography color="textSecondary">
              {place.phone}
            </Typography>
          </div>
          <div className={classes.infoItem}>
            <Typography variant="subtitle1">
              Время работы
            </Typography>
            <Typography color="textSecondary">
              {place.working_hours}
            </Typography>
          </div>
          <div className={classes.infoItem}>
            <Typography variant="subtitle1">
              Цена
            </Typography>
            <Typography color="textSecondary">
              {place.price}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  </Dialog>

PlaceDialog.propTypes = {
  classes: object.isRequired,
  place: placeShape.isRequired,
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  onReplace: func,
}
PlaceDialog.defaultProps = {
  onReplace: () => {}
}

export default withStyles(styles)(PlaceDialog)
