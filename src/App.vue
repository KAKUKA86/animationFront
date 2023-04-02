<template>
  <el-container class="parent">
    <AdAsideMenu v-if="acode ===1"/>
    <AuAsideMenu v-else-if="acode ===2"/>
    <el-container style="flex: 1">
      <AdHeaderMenu v-if="acode === 1"/>
      <AuHeaderMenu v-else-if="acode === 2"/>
      <MainHeader v-else/>
      <div style="margin: 80px auto auto;" >
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
import AdHeaderMenu from "./views/AdController/AdHeaderMenu.vue";
import AdAsideMenu from "./views/AdController/AdAsideMenu.vue";
import AuHeaderMenu from "./views/AuController/AuHeaderMenu.vue";
import AuAsideMenu from "./views/AuController/AuAsideMenu.vue";

const obj = JSON.parse(sessionStorage.getItem('token') || "{}")
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
.parent{
  display: flex;
  flex-direction: row;
}
</style>
