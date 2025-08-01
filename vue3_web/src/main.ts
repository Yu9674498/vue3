import { createApp } from 'vue'
import '@/assets/scss/style.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
// 引入 Element Plus 中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入 Element Plus（自动导入时仍需显式调用 app.use 来配置全局参数）
import ElementPlus from 'element-plus'

const app = createApp(App)

const pinia = createPinia()

// 全局配置语言包
app.use(ElementPlus, {
  locale: zhCn // 配置中文语言
})

app.use(pinia).use(router)

// router 准备就绪后挂载应用
router.isReady().then(() => {
  app.mount('#app')
})
