import useSWRV, { mutate } from 'swrv'
import API_ROUTES from '../constants/api-routes'
import LOCAL_STORAGE_KEYS from '../constants/local-storage-keys'
import { UserInfo } from '../types/User'
import { removeLocalStorageItem } from '../utils/local-storage'
import userFetcher from '../utils/fetchers/user'

const useAuth = () => {
  const fetchingOptions = {
    dedupingInterval: 0,
    revalidateOnFocus: false
  }

  const {
    data: user,
    error,
  } = useSWRV<UserInfo | null>(API_ROUTES.USER.INFO, userFetcher, fetchingOptions)

  const loading = !!(!user && !error)

  const logout = () => {
    removeLocalStorageItem(LOCAL_STORAGE_KEYS.JWT_TOKEN)
    mutate(API_ROUTES.USER.INFO, null)
    mutate(API_ROUTES.IMPULZE.INDEX, null)
  }

  return {
    error,
    loading,
    user,
    logout,
  }
}

export default useAuth
