import React, { Component } from 'react'
import { object, func, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Expand, PlaceCard } from 'components'
import entertainmentShape from 'shapes/entertainment'

const styles = {
  root: {},
  places: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

class EntertainmentGroup extends Component {

  wantThis = (place) => {
    const { entertainment, onIWantThis } = this.props
    return onIWantThis(entertainment, place)
  }

  render() {
    const { classes, entertainment, buttonTitle } = this.props
    return (
      <section className={classes.root}>
        <Expand title={entertainment.title}>
          <div className={classes.places}>
            {entertainment.places.map(place =>
              <PlaceCard
                key={place.id}
                place={place}
                onSelect={this.wantThis}
                buttonTitle={buttonTitle}
              />
            )}
          </div>
        </Expand>
      </section>
    )
  }
}

EntertainmentGroup.propTypes = {
  entertainment: entertainmentShape,
  classes: object.isRequired,
  buttonTitle: string,
  onIWantThis: func.isRequired,
}

export default withStyles(styles)(EntertainmentGroup)
