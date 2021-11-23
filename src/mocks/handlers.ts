import { rest } from 'msw'
import mockUserInfo from './fixtures/user-info'

export default [
  rest.get('/api/auth/info', (req, res, ctx) => (res(
    ctx.json(mockUserInfo)
  )))
]
