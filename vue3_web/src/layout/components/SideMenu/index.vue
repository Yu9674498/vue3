<template>
  <div class="side-main">
    <div class="side-logo">
      <el-image style="width: 100px; height: 100px" :src="logo" fit="cover" />
    </div>
    <div class="side-menu">
      <el-scrollbar>
        <el-menu
          :default-active="useRoute().path"
          :default-openeds="defultIndex"
          class="el-menu-dynamic"
          :collapse="isCollapse"
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
import { useRoute } from 'vue-router'

const permissionStore = usePermissionStore()
const defultIndex = reactive(['/system'])
const isCollapse = ref(false)
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
    border-bottom: #aaa solid 1px;
    // background: rgb(251, 245, 233);
  }

  .side-menu {
    flex: 1;
    overflow: hidden;

    .el-menu-dynamic {
      border-right: none;
    }
  }
}
</style>
