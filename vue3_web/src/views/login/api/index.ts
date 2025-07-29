import type * as Users from './type'
import { request } from '@/api/http'

/** 获取当前登录用户详情 */
export function loginApi(data: Users.LoginRequestData) {
  return request<Users.LoginResponseData>({
    url: '/auth/login',
    method: 'post',
    data
  })
}
