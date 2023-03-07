import './assets/index.postcss'
import './style/reboot.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { createHead } from '@vueuse/head'

import App from './App.vue'
import layoutRegister from './layout/index'
import router from './router/index'

const head = createHead()
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(head)

layoutRegister(app)

app.mount('#app')
