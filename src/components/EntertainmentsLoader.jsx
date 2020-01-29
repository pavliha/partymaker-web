import React from 'react'
import { array, func, shape, string } from 'prop-types'
import { actions, connect, select } from 'src/redux'
import isEmpty from 'lodash/isEmpty'
import Fuse from 'fuse.js'
import { Loader, EntertainmentListItem } from 'components'

const options = {
  keys: ['title', 'places.title'],
}

const useFuseSearch = (search, entertainments) => {
  const fuse = new Fuse(entertainments, options)
  const results = fuse.search(search || '')
  return isEmpty(results) ? entertainments : results
}

const EntertainmentsLoader = ({ onSelect, onExpand, onLoad, search, redux }) =>
  <Loader load={redux.loadEntertainments} onLoad={onLoad}>
    {useFuseSearch(search, redux.entertainments)
      .filter(e => !isEmpty(e.places))
      .map(entertainment =>
        <EntertainmentListItem
          key={entertainment.id}
          search={search}
          entertainment={entertainment}
          onExpand={onExpand}
          onSelect={onSelect}
        />,
      )}
  </Loader>

EntertainmentsLoader.propTypes = {
  search: string,
  onLoad: func,
  onSelect: func,
  onExpand: func.isRequired,
  redux: shape({
    entertainments: array,
    loadEntertainments: func.isRequired,
  }),
}

const redux = state => ({
  entertainments: select.entertainments.all(state),
  loadEntertainments: actions.entertainments.loadMany,
})

export default connect(redux)(EntertainmentsLoader)
