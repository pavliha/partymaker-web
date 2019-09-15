import React from 'react'
import { object, func, bool, node } from 'prop-types'
import { Button, Dialog, Typography, withStyles, List, ListItem, ListItemText } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture, CloseButton } from 'components'

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  picture: {
    borderRadius: 0,
    width: 410,
    height: 300,
    [theme.breakpoints.up('sm')]: {
      width: 500,
    }
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
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    }
  },
  subtitle: {
    fontSize: 13,
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    }
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
  info: {},

  infoItem: {
    textAlign: 'center',
    maxWidth: 130,
  },

  orderButton: {
    marginRight: 20,
    color: 'rgba(0,0,0,0.54)',
  },
  paperWidthSm: {
    maxWidth: 'initial',
    maxHeight: 'calc(100% - 30px)',
    margin: 15,
  },
  primaryTitle: {
    paddingLeft: 5,
  },
  datetime: {
    paddingTop: 2,
  },
  entertainment: {
    paddingTop: 5,
    paddingBottom: 5,
  }
})

const PlaceDialog = ({ classes, place, datetime, isOpen, isGuest, onClose, onReplace }) =>
  <Dialog
    classes={{ paperWidthSm: classes.paperWidthSm }}
    open={isOpen}
    onClose={onClose}
  >
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.entertainment}>
          <Typography variant="h6">{place.entertainment?.title}</Typography>
          {datetime}
        </div>
        <CloseButton onClick={onClose} />
      </header>
      <Picture src={place.picture_url} className={classes.picture} />
      <div className={classes.container}>
        <div className={classes.primaryTitle}>
          <Typography className={classes.title}>
            {place.title}
          </Typography>
          <Typography className={classes.subtitle} color="textSecondary">
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
          <Button variant="outlined" disabled={isGuest} color="primary" onClick={onReplace}>
            Сменить
          </Button>
        </div>
        <List className={classes.info}>
          <ListItem>
            <ListItemText primary="Номер телефона" secondary={place.phone} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Время работы" secondary={place.working_hours} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Цена" secondary={place.price} />
          </ListItem>
        </List>
      </div>
    </div>
  </Dialog>

PlaceDialog.propTypes = {
  classes: object.isRequired,
  datetime: node,
  place: placeShape.isRequired,
  isOpen: bool.isRequired,
  isGuest: bool,
  onClose: func.isRequired,
  onReplace: func,
}
PlaceDialog.defaultProps = {
  onReplace: () => {}
}

export default withStyles(styles)(PlaceDialog)
