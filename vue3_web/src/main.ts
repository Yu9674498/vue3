import { createApp } from 'vue'
import '@/assets/scss/style.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia).use(router)

// router 准备就绪后挂载应用
router.isReady().then(() => {
  app.mount('#app')
})
