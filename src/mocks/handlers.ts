import { rest } from 'msw'
import mockUserInfo from './fixtures/user-info'
import mockImpulzes from './fixtures/impulzes'
import API_ROUTES from '../constants/api-routes'

export default [
  rest.get(API_ROUTES.USER.INFO, (req, res, ctx) => (res(
    ctx.json(mockUserInfo)
  ))),
  rest.get(API_ROUTES.IMPULZE.INDEX, (req, res, ctx) => (res(
    ctx.json(mockImpulzes)
  )))
]
