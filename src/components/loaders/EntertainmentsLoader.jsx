import React from 'react'
import { array, func, shape, string } from 'prop-types'
import { actions, connect, select } from 'src/redux'
import { Entertainment, Loader } from 'components'
import isEmpty from 'lodash/isEmpty'
import Fuse from 'fuse.js'

const options = {
  keys: ['title', 'places.title']
}

const EntertainmentsLoader = ({ onSelect, onLoad, search, redux: { entertainments, loadEntertainments } }) => {
  const fuse = new Fuse(entertainments, options)
  const results = fuse.search(search || '')
  const array = isEmpty(results) ? entertainments : results

  return (
    <Loader load={loadEntertainments} onLoad={onLoad}>
      {array
        .filter(e => !isEmpty(e.places))
        .map(entertainment =>
          <Entertainment
            search={search}
            key={entertainment.id}
            entertainment={entertainment}
            onSelect={onSelect}
          />
        )}
    </Loader>
  )
}

EntertainmentsLoader.propTypes = {
  search: string,
  onLoad: func,
  onSelect: func,
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
