import axios from 'axios'
import { store, actions } from 'src/redux'

const http = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 20000,
})

http.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.getState().auth?.token}`
  return config
})

// Add a response interceptor
http.interceptors.response.use(
  response => response.data,
  errors => {
    if (errors?.response?.status === 401) store.dispatch(actions.auth.logout())
    if (errors?.response?.status === 404) throw errors
    if (errors?.response?.data) throw errors.response.data
    if (errors?.response) throw errors.response
    if (errors) throw errors
  })

export default http
