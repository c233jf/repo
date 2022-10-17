import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'virtual:windi.css'

import '../mocks'
import './permission'
import { router } from './router'

import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
