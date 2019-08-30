import { withFormik } from 'formik'
import * as Yup from 'yup'
import transformValidationApi from 'utils/transformValidationApi'

const formik = withFormik({
  validationSchema: Yup.object().shape({}),

  mapPropsToValues: () => ({
    date: new Date(),
    time: '18:00'
  }),

  handleSubmit: async (form, { props: { onSubmit }, setErrors, setSubmitting }) => {
    try {
      setSubmitting(true)
      await onSubmit()
    } catch (error) {
      setErrors(transformValidationApi(error))
    } finally {
      setSubmitting(false)
    }
  },
  displayName: 'DatetimeForm',
})

export default formik
