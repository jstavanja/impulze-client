import { setupServer } from 'msw/node'
import handlers from '../../mocks/handlers'
import mockUserInfo from '../../mocks/fixtures/user-info'
import userFetcher from './user'
import API_ROUTES from '../../constants/api-routes'
import LOCAL_STORAGE_KEYS from '../../constants/local-storage-keys'

const server = setupServer(...handlers)

describe('User fetcher', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT_TOKEN)
  })

  it('should fetch the user from the api', async () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.JWT_TOKEN, '"jwt"')
    const userInfo = await userFetcher(API_ROUTES.USER.INFO)
    expect(userInfo).toStrictEqual(mockUserInfo)
  })

  it('should throw an error if there is no local storage item', async () => {
    try {
      await userFetcher(API_ROUTES.USER.INFO)
    } catch (err) {
      expect(err).toBeDefined()
    }
  })
})
