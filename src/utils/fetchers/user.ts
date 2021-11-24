import axios from 'axios'
import LOCAL_STORAGE_KEYS from '../../constants/local-storage-keys'
import { UserInfo } from '../../types/User'
import { getLocalStorageItem } from '../local-storage'

const userFetcher = async (url: string): Promise<UserInfo> => {
  getLocalStorageItem(LOCAL_STORAGE_KEYS.JWT_TOKEN) // throws if no token

  const { data: user } = await axios.get<UserInfo>(url)

  return user
}

export default userFetcher
