import { withFormik } from 'formik'
import * as Yup from 'yup'
import transformValidationApi from 'utils/transformValidationApi'
import moment from 'moment'

const formik = withFormik({
  validationSchema: Yup.object().shape({}),

  mapPropsToValues: ({ room, auth }) => ({
    date: moment(room.date).format('YYYY-MM-DD'),
    time: room.time,
    guests: room.guests.length,
    phone: auth.phone,
  }),

  handleSubmit: async (form, { props, setErrors, setSubmitting }) => {
    try {
      setSubmitting(true)
      await props.onSubmit(form)
    } catch (err) {
      setErrors(transformValidationApi(err))
    } finally {
      setSubmitting(false)
    }

  },
  displayName: 'OrderForm',
})

export default formik
