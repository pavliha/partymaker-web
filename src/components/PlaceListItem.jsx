import React from 'react'
import { bool, func, object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture } from 'components'
import classNames from 'classnames'
import { appendFileNameSuffix } from 'utils'

const styles = theme => ({
  root: {
    cursor: 'pointer',
    position: 'relative',
    margin: 10,
    width: 100,
    display: 'inline-flex',
    flexDirection: 'column',
    '@media only screen and (max-width: 325px)': {
      margin: 5,
    },
    [theme.breakpoints.up('sm')]: {
      width: 150,
    }
  },

  picture: {
    borderRadius: 20,
    width: 100,
    height: 100,
    [theme.breakpoints.up('md')]: {
      height: 150,
      width: 150,
      borderRadius: 25,
    }
  },

  title: {
    fontSize: 13,
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
    }
  },

  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 5,
  },

  secondaryButton: {
    color: 'rgba(0,0,0,0.54)'
  },

  subtitle: {
    fontSize: 13,
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    }
  },

  inline: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inlinePicture: {
    borderRadius: 20,
    width: 80,
    height: 80,
  },

  inlineContainer: {
    paddingTop: 0,
    paddingLeft: 15,
  }
})

const PlaceListItem = ({ classes, place, inline, onSelect }) => {
  const rootStyle = classNames({ [classes.root]: true, [classes.inline]: inline })
  const pictureStyle = classNames({ [classes.picture]: true, [classes.inlinePicture]: inline })
  const containerStyle = classNames({ [classes.container]: true, [classes.inlineContainer]: inline })

  return (
    <div className={rootStyle} onClick={() => onSelect(place)}>
      <Picture src={appendFileNameSuffix(place?.picture_url, '-thumbnail')} className={pictureStyle} />
      <div className={containerStyle}>
        <Typography className={classes.title}>{place?.title}</Typography>
        <Typography className={classes.subtitle} color="textSecondary">{place?.price}</Typography>
        {inline && <Typography className={classes.subtitle} color="textSecondary">
          {place?.contacts?.directions}
        </Typography>
        }
      </div>
    </div>
  )
}

PlaceListItem.propTypes = {
  classes: object.isRequired,
  place: placeShape.isRequired,
  inline: bool,
  onSelect: func,
}

PlaceListItem.defaultProps = {
  onSelect: () => {}
}

export default withStyles(styles)(PlaceListItem)
