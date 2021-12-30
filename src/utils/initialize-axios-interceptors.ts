import axios from 'axios'
import LOCAL_STORAGE_KEYS from '../constants/local-storage-keys'
import { getLocalStorageItem } from './local-storage'

const initializeAxiosInterceptors = () => {
  axios.interceptors.request.use((config) => {
    if (!config.headers) {
      config.headers = {}
    }

    try {
      const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.JWT_TOKEN)
      config.headers.Authorization = `Bearer ${token}`
    } catch (err) {
      // if there is no JWT token, we don't add the authorization header to the request
    }

    return config
  })

  axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL as string || 'http://localhost:3000'
}

export default initializeAxiosInterceptors
