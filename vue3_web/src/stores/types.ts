// 定义后端路由数据结构
export interface BackendRoute {
  path: string
  component?: any // 组件路径可能为空（如重定向路由）
  name: string
  redirect?: string
  meta?: {
    title?: string
    icon?: string
    svgIcon?: string
    elIcon?: string
    affix?: boolean
    keepAlive?: boolean
    hidden?: boolean
    alwaysShow?: boolean
  }
  children?: BackendRoute[]
}

// 定义转换后的前端路由类型
export interface FrontendRoute
  extends Omit<BackendRoute, 'component' | 'children'> {
  component?: any // Vue 组件类型
  children?: FrontendRoute[]
  alias?: any
}
