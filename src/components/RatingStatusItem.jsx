import React, { Fragment } from 'react'
import { object, number } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { StatusItem } from 'components'
import StarIcon from 'mdi-react/StarIcon'
import { formatCount } from 'utils'

const styles = {
  root: {},
}

const RatingStatusItem = ({ classes, rating_count, rating }) => {

  const format = formatCount({
    few: 'отзывов',
    one: 'отзыв',
    two: 'отзыва'
  })

  return (
    <StatusItem
      className={classes.root}
      primary={(
        <Fragment>
          <div>{rating.toFixed(1)}</div>
          <StarIcon style={{ width: 15, height: 15 }} />
        </Fragment>
      )}
      secondary={`${rating_count} ${format(rating_count)}`}
    />
  )
}

RatingStatusItem.propTypes = {
  classes: object.isRequired,
  rating_count: number.isRequired,
  rating: number.isRequired,
}

export default withStyles(styles)(RatingStatusItem)
