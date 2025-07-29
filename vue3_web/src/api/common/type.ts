// 用心信息
export interface UserResponseData {
  id: number
  username: string
  email?: string
  avatar?: string
  role: string[] // 可选角色数组
}
// 路由信息
// 定义单个路由项的类型
export interface Routes {
  routes: string // 路由路径
}

export type UserResponse = ApiResponseData<UserResponseData>
export type RoutesResponse = ApiResponseData<Routes>
