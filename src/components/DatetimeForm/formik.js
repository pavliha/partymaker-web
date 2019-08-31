import { withFormik } from 'formik'
import * as Yup from 'yup'
import transformValidationApi from 'utils/transformValidationApi'

const formik = withFormik({
  validationSchema: Yup.object().shape({}),

  mapPropsToValues: () => ({
    date: '2019-08-29',
    time: '18:00'
  }),

  handleSubmit: ({ date, time }, { props: { onSubmit }, setErrors, setSubmitting }) => {
    try {
      setSubmitting(true)
      onSubmit({ date, time: time.substring(0, 5) })
    } catch (error) {
      setErrors(transformValidationApi(error))
    } finally {
      setSubmitting(false)
    }
  },
  displayName: 'DatetimeForm',
})

export default formik
