import React from 'react'
import { object, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { requirementsShape } from 'shapes'
import { PlayersStatusItem, StatusItem } from 'components'
import classNames from 'classnames'

const styles = {
  root: {
    display: 'flex',
  },
}

const PlaceStatus = ({ classes, className, requirements: { age_min, players_max, players_min, min_order_amount } }) =>
  <div className={classNames([classes.status, className])}>
    {!age_min || <StatusItem primary={`${age_min}+`} secondary="возраст" />}
    <PlayersStatusItem players={{ min: players_min, max: players_max }} />
    {min_order_amount && <StatusItem primary={`${min_order_amount} грн`} secondary="минимальный заказ" />}
  </div>

PlaceStatus.propTypes = {
  classes: object.isRequired,
  className: string,
  requirements: requirementsShape
}

export default withStyles(styles)(PlaceStatus)
