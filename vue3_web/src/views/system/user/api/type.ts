// 接口返回data定义
export interface responseContent {
  data: {
    username: string
    role: string
    email: string
  }[]
  total: number
}

export type responseData = ApiResponseData<responseContent>
