import { rest } from 'msw'
import mockUserInfo from './fixtures/user-info'
import mockImpulzes from './fixtures/impulzes'

export default [
  rest.get('/api/auth/info', (req, res, ctx) => (res(
    ctx.json(mockUserInfo)
  ))),
  rest.get('/api/impulze', (req, res, ctx) => (res(
    ctx.json(mockImpulzes)
  )))
]
