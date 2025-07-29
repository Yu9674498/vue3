<template>
  <div class="login-page">
    <div class="login-container">
      <el-form
        ref="loginFormRef"
        :model="loginFormData"
        :rules="loginFormRules"
        label-position="top"
        size="large"
        @submit.prevent
      >
        <h2 class="form-title">This is Yu's test &nbsp;|&nbsp; Login</h2>
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginFormData.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginFormData.password"
            type="password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="handleLogin()"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" @click="handleLogin()">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'
import type { LoginRequestData } from './api/type'
import { useUserStore } from '@/stores/user'
import { loginApi } from '@/views/login/api/index'
import { setToken } from '@/utils/cookies'

const router = useRouter()

const userStore = useUserStore()
/** 登录表单元素的引用 */
const loginFormRef = useTemplateRef('loginFormRef') // vue3.5版本之后的写法

/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: 'admin',
  password: '123456'
})

/** 登录表单校验规则 */
const loginFormRules = reactive<FormRules<LoginRequestData>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
  ]
})

/** 登录 */
const handleLogin = () => {
  loginFormRef.value?.validate(async valid => {
    if (valid) {
      try {
        const res = await loginApi(loginFormData)
        setToken(res.data.token)
        userStore.token = res.data.token
        // // 获取用户信息
        // await userStore.getInfo()
        // // 添加动态路由
        // await permissionStore.generateRoutes()
        router.push({ path: '/' })
      } catch (err) {
        console.log(err)
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@use './scss/index.scss';
</style>
