import React from 'react'
import { array, func, shape } from 'prop-types'
import { actions, connect, select } from 'src/redux'
import { Entertainment, Load } from 'components'

const EntertainmentsLoader = ({ onSelectPlace, onLoad, redux: { entertainments, loadEntertainments } }) =>
  <Load load={loadEntertainments} onLoad={onLoad}>
    {entertainments.map(entertainment =>
      <Entertainment
        key={entertainment.id}
        entertainment={entertainment}
        onSelectPlace={onSelectPlace}
      />
    )}
  </Load>

EntertainmentsLoader.propTypes = {
  onLoad: func,
  onSelectPlace: func.isRequired,
  redux: shape({
    entertainments: array,
    loadEntertainments: func.isRequired,
  })
}

const redux = state => ({
  entertainments: select.entertainments.all(state),
  loadEntertainments: actions.entertainments.loadMany,
})

export default connect(redux)(EntertainmentsLoader)
