import type * as Users from './type'
import { request } from '@/api/http'

/** 获取当前登录用户详情 */
export function getUserList(data: { pageNum: number; pageSize: number }) {
  return request<Users.responseData>({
    url: '/user/getUserList',
    method: 'post',
    data
  })
}
