<template>
  <el-container>
    <AsideMenu v-if="acode != null"/>
  <el-container>
    <HeaderMenu v-if="acode === 1&&2"/>
    <MainHeader v-else/>
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
  </el-container>
</template>

<script lang="ts" setup>
import MainHeader from "./views/MainHeader.vue";
import HeaderMenu from "./views/AdController/HeaderMenu.vue";
import AsideMenu from "./views/AdController/AsideMenu.vue";
const obj = JSON.parse(sessionStorage.getItem('token')||"{}")
const acode = obj.acode




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
