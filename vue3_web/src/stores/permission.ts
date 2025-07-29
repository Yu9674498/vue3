import { defineStore } from 'pinia'
import { getRoutes } from '@/api/common'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import type { BackendRoute, FrontendRoute } from '@/stores/types'

export const usePermissionStore = defineStore('permission', () => {
  let permission = reactive<object>([])
  let dynamicRoutes = reactive<BackendRoute[]>([])

  // 动态加载组件 - 添加类型注解
  const modules = import.meta.glob([
    '/src/layout/**/*.vue',
    '/src/views/**/*.vue'
  ])
  const loadComponent = (componentPath: string): (() => Promise<any>) => {
    // 构建匹配的 key, 例如: /src/views/demo/unocss/index.vue
    // 这里需要根据后端返回的 componentPath 格式 (e.g., "views/demo/unocss/index") 进行调整
    const fullPath = `/src/${componentPath}.vue`

    if (modules[fullPath]) {
      return modules[fullPath]
    }

    // 如果没有找到组件，可以打印一个更明确的错误信息并返回404组件
    console.error(
      `Component not found at path: ${componentPath}. Corresponding file expected at: ${fullPath}`
    )
    return () => import('@/views/error/404.vue')
  }

  // 递归转换路由配置 - 添加类型注解
  const transformRoutes = (routes: BackendRoute[]): FrontendRoute[] => {
    return routes.map((route: BackendRoute) => {
      const transformed: FrontendRoute = {
        ...route,
        component: loadComponent(route.component),
        children: route.children ? transformRoutes(route.children) : []
      }
      return transformed
    })
  }

  // 获取当前用户的路由
  const generateRoutes = async () => {
    try {
      const res = await getRoutes()
      const parsedRoutes: BackendRoute[] = JSON.parse(res.data.routes)

      // 存储转换后的路由
      dynamicRoutes.length = 0
      dynamicRoutes.push(...parsedRoutes)

      // 转换路由配置
      const dynamicTransformRoutes = transformRoutes(parsedRoutes)

      // 添加动态路由
      dynamicTransformRoutes.forEach((route: FrontendRoute) => {
        router.addRoute(route as RouteRecordRaw)
      })

      router.addRoute({
        path: '/404',
        name: 'NotFound',
        component: () => import('@/views/error/404.vue'),
        meta: { title: '404' }
      })
    } catch (error) {
      console.error('路由加载失败:', error)
    }
  }

  return {
    permission,
    dynamicRoutes,
    generateRoutes
  }
})
