import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Expand, PlaceCard } from 'components'

const styles = {
  root: {},
  places: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

class Entertainment extends Component {

  wantThis = (place) => {
    const { entertainment, onIWantThis } = this.props
    return onIWantThis(entertainment, place)
  }

  render() {
    const { classes, entertainment } = this.props
    return (
      <section className={classes.root}>
        <Expand title={entertainment.title}>
          <div className={classes.places}>
            {entertainment.places.map(place =>
              <PlaceCard key={place.id} place={place} onIWantHere={this.wantThis} />
            )}
          </div>
        </Expand>
      </section>
    )
  }
}

Entertainment.propTypes = {
  classes: object.isRequired,
  onIWantThis: func.isRequired,
}

export default withStyles(styles)(Entertainment)
