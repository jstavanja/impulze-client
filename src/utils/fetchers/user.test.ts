import { setupServer } from 'msw/node'
import handlers from '../../mocks/handlers'
import mockUserInfo from '../../mocks/fixtures/user-info'
import userFetcher from './user'
import API_ROUTES from '../../constants/api-routes'

const server = setupServer(...handlers)

describe('User fetcher', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    localStorage.removeItem('impulze_token')
  })

  it('should fetch the user from the api', async () => {
    localStorage.setItem('impulze_token', '"jwt"')
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
