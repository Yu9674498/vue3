import type { NavigationGuard } from 'vue-router'
import { getToken } from '@/utils/cookies'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

// 白名单路径（支持正则表达式）
const whiteList = [
  '/login',
  '/register',
  '/auth-redirect', // 认证重定向
  '/404',
  '/401'
]
export const authGuard: NavigationGuard = async (to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  // 检查是否有Token
  const token = getToken()

  if (token) {
    // 已登录用户访问登录页 -> 重定向到首页
    if (to.path === '/login') {
      return next({ path: '/' })
    }

    // 如果用户信息未加载，则获取用户信息
    if (userStore.roles.length === 0) {
      try {
        // 获取用户信息
        await userStore.getInfo()

        // 添加动态路由
        await permissionStore.generateRoutes()

        // 重新触发当前路由匹配
        return next({ ...to, replace: true })
      } catch (error) {
        // 捕获错误并处理
        ElMessage.error('获取用户信息失败')
        userStore.logout()
        next(`/login`)
      }
    } else {
      next()
    }
  } else {
    // 未登录用户 -> 重定向到登录页
    // 在白名单中的路径直接放行
    if (whiteList.includes(to.path)) {
      return next()
    } else {
      next(`/login`)
    }
  }
}
