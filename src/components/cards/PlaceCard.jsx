import React, { Component } from 'react'
import { object, func, bool } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import placeShape from 'shapes/place'
import { Picture } from 'components'
import classNames from 'classnames'
import appendFileNameSuffix from 'utils/appendFileNameSuffix'

const styles = {
  root: {
    cursor: 'pointer',
    position: 'relative',
    margin: 10,
    width: 150,
    display: 'inline-flex',
    flexDirection: 'column'
  },

  picture: {
    borderRadius: 25,
    width: 150,
    height: 150,
  },

  title: {
    fontSize: 16,
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
    fontSize: '0.9rem',
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
}

class PlaceCard extends Component {

  select = () => {
    const { place, onSelect } = this.props
    onSelect(place)
  }

  render() {
    const { classes, place, inline } = this.props

    const rootStyle = classNames({ [classes.root]: true, [classes.inline]: inline })
    const pictureStyle = classNames({ [classes.picture]: true, [classes.inlinePicture]: inline })
    const containerStyle = classNames({ [classes.container]: true, [classes.inlineContainer]: inline })

    return (
      <div className={rootStyle} onClick={this.select}>
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
}

PlaceCard.propTypes = {
  classes: object.isRequired,
  place: placeShape.isRequired,
  inline: bool,
  onSelect: func,
}

PlaceCard.defaultProps = {
  onSelect: () => {}
}

export default withStyles(styles)(PlaceCard)
