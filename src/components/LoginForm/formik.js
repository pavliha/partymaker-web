import { withFormik } from 'formik'
import * as Yup from 'yup'
import to from 'util-to'
import { transformValidationApi } from 'utils'

const formik = withFormik({
  validationSchema: Yup.object()
    .shape({
      email: Yup.string()
        .email('Неправильный email адрес!')
        .required('Это поле является обязательным'),
      password: Yup.string()
        .min(6, 'Пароль должен быть больше чем 6 символов')
        .required('Это поле является обязательным'),
    }),

  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),

  handleSubmit: async (form, { props, setErrors, setSubmitting }) => {
    setSubmitting(true)
    const [rejectedAction] = await to(props.onSubmit(form))
    if (rejectedAction) setErrors(transformValidationApi(rejectedAction))
    setSubmitting(false)
  },
  displayName: 'LoginForm',
})

export default formik
