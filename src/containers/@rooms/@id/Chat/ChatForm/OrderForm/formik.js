import { withFormik } from 'formik'
import * as Yup from 'yup'
import to from 'util-to'
import transformValidationApi from 'utils/transformValidationApi'

const initialValues = ({ room, user }) => ({
  date: room.date,
  time: room.time,
  guest_count: room.guests.length,
  phone: user.phone,
})

const formik = withFormik({
  validationSchema: Yup.object().shape({}),

  mapPropsToValues: initialValues,

  handleSubmit: async (form, { props, setErrors, setSubmitting, resetForm }) => {
    setSubmitting(true)
    resetForm(initialValues(props))
    const [err] = await to(props.onSubmit(form))
    if (err) setErrors(transformValidationApi(err))

    setSubmitting(false)
  },
  displayName: 'OrderForm',
})

export default formik
