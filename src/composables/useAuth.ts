import axios from 'axios'
import useSWRV, { mutate } from 'swrv'
import API_ROUTES from '../constants/api-routes'
import LOCAL_STORAGE_KEYS from '../constants/local-storage-keys'
import { UserInfo } from '../types/User'
import { getLocalStorageItem, removeLocalStorageItem } from '../utils/local-storage'

const swrUserFetcher = async (url: string): Promise<UserInfo> => {
  getLocalStorageItem(LOCAL_STORAGE_KEYS.JWT_TOKEN) // throws if no token

  const { data: user } = await axios.get<UserInfo>(url)

  return user
}

const useAuth = () => {
  const fetchingOptions = {
    dedupingInterval: 0,
    revalidateOnFocus: false
  }

  const {
    data: user,
    error,
  } = useSWRV<UserInfo | null>(API_ROUTES.USER.INFO, swrUserFetcher, fetchingOptions)

  const loading = !!(!user && !error)

  const logout = () => {
    removeLocalStorageItem(LOCAL_STORAGE_KEYS.JWT_TOKEN)
    mutate(API_ROUTES.USER.INFO, null)
  }

  return {
    error,
    loading,
    user,
    logout,
  }
}

export default useAuth
