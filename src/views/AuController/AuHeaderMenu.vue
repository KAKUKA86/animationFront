<template>
  <el-header style="padding: 0;width: 100%">
    <el-col span="24">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
      >
        <el-menu-item index="0" @click="click1">审核员后台欢迎界面</el-menu-item>
        <div class="flex-grow"/>
      </el-menu>
    </el-col>
  </el-header>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import router from "../../router";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

function click1() {
  router.push('/audiCenter')
}
</script>

<style>

</style>
