import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login, meta: { requiresUnauth: true } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // eslint-disable-next-line no-constant-condition
    if (false) { // add auth check here
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresUnauth)) {
    // eslint-disable-next-line no-constant-condition
    if (false) { // add auth check here
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
