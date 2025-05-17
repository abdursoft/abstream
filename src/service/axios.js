import install from '@/install'
import { authStore } from '@/stores/authStore'
import axios from 'axios'

const { host } = install

const axiosClient = axios.create({
  baseURL: `${host.replace(/\/+$/, '')}/`,
   withCredentials: true
})

axiosClient.interceptors.request.use((config) => {
  const store = authStore();
  const token = store.authToken ?? localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.otpToken) {
    config.headers.otpToken = config.otpToken
  }
  if (config.url) {
    config.url = config.url.replace(/\/+$/, '');
  }
  return config
})

export default axiosClient
