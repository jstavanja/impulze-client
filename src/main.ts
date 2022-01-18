import { createApp } from 'vue'
import { router } from './routes'
import { createPinia } from 'pinia'
import App from './App.vue'
import initializeAxiosInterceptors from './utils/initialize-axios-interceptors'
import './registerServiceWorker'

initializeAxiosInterceptors()

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
