// 统一处理 Cookie

import { CacheKey } from './cache-key'
import Cookies from 'js-cookie'

export function getToken(): string | undefined {
  return Cookies.get(CacheKey.TOKEN)
}

export function setToken(token: string): void {
  Cookies.set(CacheKey.TOKEN, token)
}

export function removeToken(): void {
  Cookies.remove(CacheKey.TOKEN)
}
