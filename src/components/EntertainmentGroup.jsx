import React, { Component } from 'react'
import { object, func, string } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import { Expand, PlaceList } from 'components'
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

  state = {
    isLoading: {}
  }

  select = (place) => async () => {
    const { entertainment, onSelect } = this.props
    this.setState({ isLoading: place.id })
    await onSelect(entertainment, place)
    this.setState({ isLoading: {} })
  }

  render() {
    const { classes, entertainment, buttonTitle } = this.props
    const { isLoading } = this.state

    return (
      <section className={classes.root}>
        <Expand title={entertainment.title}>
          <div className={classes.places}>
            <PlaceList
              places={entertainment.places}
              action={place =>
                <Button
                  disabled={isLoading[place.id]}
                  variant="outlined"
                  color="primary"
                  onClick={this.select(place)}
                >
                  {isLoading[place.id] ? 'Загрузка...' : buttonTitle}
                </Button>
              }
            />
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
