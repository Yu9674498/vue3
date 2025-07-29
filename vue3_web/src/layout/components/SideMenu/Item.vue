<template>
  <div v-if="!item.meta?.hidden">
    <template v-if="hasVisibleChildren(item) && !isRootLayoutRoute(item)">
      <el-sub-menu :index="resolvePath(item.path)">
        <template #title>
          <span v-if="item.meta?.title">{{ item.meta.title }}</span>
        </template>
        <Item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(item.path)"
        />
      </el-sub-menu>
    </template>

    <template v-else-if="!isRootLayoutRoute(item)">
      <router-link :to="resolvePath(item.path)">
        <el-menu-item :index="resolvePath(item.path)">
          <span v-if="item.meta?.title">{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <template v-else>
      <Item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(item.path)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
// ... script 部分基本保持不变，只是不再需要 import Link from './Link.vue'
import { defineProps } from 'vue'
import path from 'path-browserify'
import type { FrontendRoute } from '@/stores/types'

const props = defineProps({
  item: {
    type: Object as () => FrontendRoute,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const isRootLayoutRoute = (route: FrontendRoute): boolean => {
  // 这个判断逻辑可以简化，如果根布局路由只有一个子元素，有时也需要特殊处理
  // 但根据你给的路由数据，当前的判断是OK的
  return (
    route.path === '/' &&
    (route.children || [])?.length > 0 &&
    !route.meta?.alwaysShow
  )
}

const hasVisibleChildren = (route: FrontendRoute): boolean => {
  // 这里的逻辑是正确的，无需修改
  if (!route.children || route.children.length === 0) {
    return false
  }
  const visibleChildren = route.children.filter(child => !child.meta?.hidden)
  return visibleChildren.length > 0
}

const resolvePath = (routePath: string): string => {
  return path.resolve(props.basePath, routePath)
}
</script>
