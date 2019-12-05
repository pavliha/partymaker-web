import React from 'react'
import { object, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { additionalServiceShape } from 'shapes'
import { AdditionalServiceListItem } from 'components'

const styles = {
  root: {},
}

const AdditionalServicesList = ({ classes, additional_services }) =>
  <div className={classes.root}>
    {additional_services.map(additional_service =>
      <AdditionalServiceListItem
        key={additional_service.id}
        additional_service={additional_service}
      />
    )}
  </div>

AdditionalServicesList.propTypes = {
  classes: object.isRequired,
  additional_services: arrayOf(additionalServiceShape)
}

export default withStyles(styles)(AdditionalServicesList)
