<template>
  <div>
    <el-dropdown @command="handleCommand">
      <div class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon>
          <IEpArrowDown />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { exitSystem } from '@/api/common'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const handleCommand = type => {
  exitSystem()
  userStore.logout()
}
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
