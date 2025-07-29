import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/common'
import { getToken, removeToken } from '@/utils/cookies'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const roles = ref<string[]>([])
  const username = ref<string>('')

  // 获取用户详情
  const getInfo = async () => {
    const res = await getUserInfo()
    username.value = res.data.username
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = res.data.role.length > 0 ? res.data.role : ['role']
  }

  // 登出
  const logout = () => {
    token.value = ''
    roles.value = []
    username.value = ''
    removeToken()
    location.reload()
  }

  return {
    token,
    roles,
    username,
    getInfo,
    logout
  }
})
