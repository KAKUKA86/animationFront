<template>
  <el-header style="padding: 0">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="rgb(31,34,51)"
        text-color="#fff"
        router:true
    >
      <el-menu-item index="0">
        <router-link to="/"><img src="../assets/image/miHoYo_Game.2457753.png" style="height: 60px" alt="Logo">
        </router-link>
      </el-menu-item>
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3">
        <router-link to="/register">注册</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/login">登录</router-link>
      </el-menu-item>
    </el-menu>
    <!-- 页面标题或导航栏等 -->
  </el-header>
</template>

<script setup lang="ts">
import {ref} from "vue";

let activeIndex = ref('1')
let handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>

</style>