import React, { lazy, Suspense } from 'react'
import { func, bool, arrayOf, object, number } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Loading from 'components/loaders/Loading'
import PhotosStepper from 'components/zzz/PhotosStepper'
import photoShape from 'shapes/photo'
import CloseButton from 'components/buttons/CloseButton'

const Modal = lazy(() => import('@material-ui/core/Modal'))

const styles = {
  root: {
    maxWidth: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1500,
  }
}

const PhotosModal = ({ classes, index, photos, isOpen, onClose }) =>
  <Suspense fallback={<Loading />}>
    <Modal
      className={classes.root}
      open={isOpen}
      onClose={onClose}
    >
      {isOpen ? <PhotosStepper index={index} photos={photos} /> : <div>.</div>}
    </Modal>
    {isOpen && <CloseButton className={classes.close} onClick={onClose} />}
  </Suspense>

PhotosModal.propTypes = {
  classes: object.isRequired,
  index: number,
  photos: arrayOf(photoShape),
  isOpen: bool.isRequired,
  onClose: func.isRequired,
}
export default withStyles(styles)(PhotosModal)
