// 登录信息类型
export interface LoginRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  // code: string;
}

// 登录接口返回data定义
export interface LoginResponseContent {
  token: string // 登录成功后返回的令牌
}

export type LoginResponseData = ApiResponseData<LoginResponseContent>
