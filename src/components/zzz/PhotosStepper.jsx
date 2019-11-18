import React, { Component } from 'react'
import { arrayOf, object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Button, MobileStepper } from '@material-ui/core'
import KeyboardArrowLeftIcon from 'mdi-react/KeyboardArrowLeftIcon'
import KeyboardArrowRightIcon from 'mdi-react/KeyboardArrowRightIcon'
import SwipeableViews from 'react-swipeable-views'
import photoShape from 'shapes/photo'
import Photo from 'components/zzz/Photo'

const styles = () => ({

  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }

})

class PhotosStepper extends Component {

  state = {
    activeStep: 0,
  }

  next = () =>
    this.setState(state => ({ activeStep: state.activeStep + 1 }))

  back = () =>
    this.setState(state => ({ activeStep: state.activeStep - 1 }))

  change = step => {
    this.setState({ activeStep: step })
  }

  render() {
    const { classes, photos } = this.props
    const { activeStep } = this.state
    const maxSteps = photos.length

    const nextButton = (
      <Button size="small" onClick={this.next} disabled={activeStep === maxSteps - 1}>
        Вперед
        <KeyboardArrowRightIcon />
      </Button>
    )

    const backButton = (
      <Button size="small" onClick={this.back} disabled={activeStep === 0}>
        <KeyboardArrowLeftIcon />
        Назад
      </Button>
    )

    return (
      <div className={classes.root}>
        <SwipeableViews
          index={activeStep}
          onChangeIndex={this.change}
          enableMouseEvents
        >
          {photos.map((photo, index) => (
            <div className={classes.slide} key={photo.id}>
              {Math.abs(activeStep - index) <= 2 && <Photo photo={photo} />}
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          activeStep={activeStep}
          nextButton={nextButton}
          backButton={backButton}
        />
      </div>
    )
  }
}

PhotosStepper.propTypes = {
  classes: object.isRequired,
  photos: arrayOf(photoShape).isRequired
}

export default withStyles(styles)(PhotosStepper)
