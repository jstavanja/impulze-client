import { setupServer } from 'msw/node'
import handlers from '../../src/mocks/handlers'
import mockUserInfo from '../mocks/fixtures/user-info'
import useAuth from './useAuth'
import { mount } from 'vue-composable-tester'
import { waitFor } from '@testing-library/vue'
import LOCAL_STORAGE_KEYS from '../constants/local-storage-keys'

const server = setupServer(...handlers)

localStorage.setItem(LOCAL_STORAGE_KEYS.JWT_TOKEN, '"jwt"')

describe('useAuth composable', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  it('should return the user data if request is successful', async () => {
    const { result } = mount(() => useAuth())

    await waitFor(() => {
      expect(result.user.value).toStrictEqual(mockUserInfo)
    })
  })
})
