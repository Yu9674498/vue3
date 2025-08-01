<template>
  <div class="app-container">
    <!-- 左侧导航菜单 -->
    <SideMenu class="side-container" />
    <div class="right-container">
      <!-- 个人信息部分 -->
      <SystemArea class="system-container" />
      <!-- 右侧主体router-view部分 -->
      <AppMain class="main-container" />
    </div>
  </div>
</template>

<script setup>
import { AppMain, SideMenu, SystemArea } from './components'
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;

  .side-container {
    width: 200px;
    height: 100%;
    background: rgba($color: #fffdfd, $alpha: 1);
    border-right: #aaa solid 1px;
  }

  .right-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .system-container {
      width: 100%;
      height: 65px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-bottom: #aaa solid 1px;
      box-sizing: border-box;
      padding: 0 25px;
    }

    .main-container {
      flex: 1;
      padding: 20px;
    }
  }
}
</style>
