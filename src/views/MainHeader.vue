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
      <el-sub-menu index="1">
        <template #title>工作域</template>
        <el-menu-item index="1-1">
          <router-link to="/workplace" style="color: white;">后台管理页面</router-link>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2">
        <router-link to="/register">注册</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/login">登录</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/center">个人中心</router-link>
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
a.router-link-active, a.router-link-exact-active, a.router-link{
  text-decoration: none;
}
</style>