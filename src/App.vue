<template>
  <el-container>
    <MainHeader/>
    <div style="margin: auto">
      <el-container>
        <router-view/>
      </el-container>
    </div>
    <el-footer>
      <div>6</div>
      <!-- 页脚或版权信息等 -->
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>

import MainHeader from "./views/MainHeader.vue";


</script>

<style>
/* 可以添加一些样式 */
body {
  margin: 0;
  padding: 0;
}

div {
  display: block;
}

ul, li {
  list-style: none;
}

</style>
