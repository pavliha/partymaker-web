import React, { lazy, Suspense } from 'react'
import { func, bool, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Loading from 'components/loaders/Loading'
import PhotosStepper from 'components/zzz/PhotosStepper'
import photoShape from 'shapes/photo'

const Modal = lazy(() => import('@material-ui/core/Modal'))

const styles = {
  root: {
    maxWidth: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const PhotosModal = ({ photos, isOpen, onClose }) =>
  <Suspense fallback={<Loading />}>
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <PhotosStepper photos={photos} />
    </Modal>
  </Suspense>

PhotosModal.propTypes = {
  photos: arrayOf(photoShape),
  isOpen: bool.isRequired,
  onClose: func.isRequired,
}
export default withStyles(styles)(PhotosModal)
