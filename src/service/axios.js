import install from '@/install'
import { authStore } from '@/stores/authStore'
import axios from 'axios'

const { host } = install

const axiosClient = axios.create({
  baseURL: `${host.trimEnd('/')}/`,
})

axiosClient.interceptors.request.use((config) => {
  const token = authStore['authToken'] ?? localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.otpToken) {
    config.headers.otpToken = config.otpToken
  }
  return config
})

export default axiosClient
