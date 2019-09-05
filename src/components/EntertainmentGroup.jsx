import React, { Component } from 'react'
import { object, func, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Expand, PlaceCard } from 'components'
import entertainmentShape from 'shapes/entertainment'

const styles = theme => ({
  root: {},
  places: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start'
    }
  }
})

class EntertainmentGroup extends Component {

  select = (place) => {
    const { entertainment, onSelect } = this.props
    return onSelect(entertainment, place)
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
                onSelect={this.select}
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
  onSelect: func.isRequired,
}

export default withStyles(styles)(EntertainmentGroup)
