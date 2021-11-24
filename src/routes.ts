import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

import userFetcher from './utils/fetchers/user'
import API_ROUTES from './constants/api-routes'

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login, meta: { requiresUnauth: true } },
  { path: '/register', component: Register, meta: { requiresUnauth: true } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let userIsLoggedIn = false
  try {
    await userFetcher(API_ROUTES.USER.INFO)
    userIsLoggedIn = true
  } catch (err) {
    // user is not logged in
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // eslint-disable-next-line no-constant-condition
    if (!userIsLoggedIn) { // add auth check here
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresUnauth)) {
    // eslint-disable-next-line no-constant-condition
    if (userIsLoggedIn) { // add auth check here
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
