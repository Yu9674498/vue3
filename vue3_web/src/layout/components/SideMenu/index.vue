<template>
  <div class="side-main">
    <div class="side-logo">
      <el-image style="width: 100px; height: 100px" :src="logo" fit="cover" />
    </div>
    <div class="side-menu">
      <el-scrollbar>
        <el-menu
          :default-active="route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <Item
            v-for="route in permissionStore.dynamicRoutes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/index/Logo.png'
import Item from './Item.vue'
import { usePermissionStore } from '@/stores/permission'

const permissionStore = usePermissionStore()

import { useRoute } from 'vue-router'

// 获取当前路由对象
const route = useRoute()

// 打印当前路由信息
console.log('当前路径:', route.path) // 例如: "/home"
console.log('当前路由名称:', route.name) // 例如: "Home"
console.log('路由参数:', route.params) // 例如: { id: '123' }
console.log('查询参数:', route.query) // 例如: { page: '1', size: '10' }

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.side-main {
  display: flex;
  flex-direction: column;

  .side-logo {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: rgb(251, 245, 233);
  }

  .side-menu {
    flex: 1;
    overflow: hidden;
  }
}
</style>
