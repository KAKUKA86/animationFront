<template>
<el-card>
  <h1>欢迎来到管理员页面</h1>
  <el-button type="error" @click="refresh">点击刷新</el-button>
</el-card>
</template>

<script lang="ts" setup>
function refresh() {
  location.reload()
}
</script>

<style scoped>

</style>