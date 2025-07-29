import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guard'

// 基础路由（不需要动态添加的）
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// 注册全局导航守卫
router.beforeEach(authGuard)

router.afterEach(() => {
  // 可以在这里添加页面加载完成后的逻辑
  // 如：关闭加载动画、页面统计等
})

// 导出
export default router
