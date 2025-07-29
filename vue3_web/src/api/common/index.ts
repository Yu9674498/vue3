import type * as Types from './type'
import { request } from '@/api/http'

/** 获取当前登录用户详情 */
export function getUserInfo() {
  return request<Types.UserResponse>({
    url: '/user/getUserInfo',
    method: 'get'
  })
}
/** 获取当前登录用户路由详情 */
export function getRoutes() {
  return request<Types.RoutesResponse>({
    url: '/user/getUserRoutes',
    method: 'get'
  })
}
/** 退出系统 */
export function exitSystem() {
  return request<ApiResponseData>({
    url: '/auth/logout',
    method: 'post'
  })
}
