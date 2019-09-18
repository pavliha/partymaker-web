import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Expand, PlacesList } from 'components'
import entertainmentShape from 'shapes/entertainment'

const styles = () => ({
  root: {},
})

class EntertainmentGroup extends Component {

  select = (place) => async () => {
    const { entertainment, onSelect } = this.props
    await onSelect(entertainment, place)
  }

  render() {
    const { classes, entertainment } = this.props

    return (
      <section className={classes.root}>
        <Expand title={entertainment.title}>
          <PlacesList places={entertainment.places} />
        </Expand>
      </section>
    )
  }
}

EntertainmentGroup.propTypes = {
  entertainment: entertainmentShape,
  classes: object.isRequired,
  onSelect: func.isRequired,
}

export default withStyles(styles)(EntertainmentGroup)
