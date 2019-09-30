import { withFormik } from 'formik'
import * as Yup from 'yup'
import to from 'util-to'
import transformValidationApi from 'utils/transformValidationApi'
import uniqId from 'uniqid'

const initialValues = () => ({
  text: '',
  token: `temp-${uniqId()}`,
})

const formik = withFormik({
  validationSchema: Yup.object().shape({}),

  mapPropsToValues: initialValues,

  handleSubmit: async (form, { props, setErrors, setSubmitting, resetForm }) => {
    if (!form.text) return
    setSubmitting(true)
    resetForm(initialValues(props))
    const [err] = await to(props.onSubmit(form))
    if (err) setErrors(transformValidationApi(err))

    setSubmitting(false)
  },
  displayName: 'CommentForm',
})

export default formik
