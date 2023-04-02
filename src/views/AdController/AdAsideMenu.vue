<template>
  <el-aside style="width: 280px">
    <el-col :span="24">
      <h1 class="mb-2">管理员后台仪表盘</h1>
      <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="0"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-menu-item-group title="Group One"/>
        <el-menu-item index="1" @click="click1()">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>分区管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="click2()">
          <el-icon>
            <document/>
          </el-icon>
          <span>词库管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="click3()">
          <el-icon>
            <setting/>
          </el-icon>
          <span>公告管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="click4()">
          <el-icon>
            <location/>
          </el-icon>
          <span>审核员管理</span>
        </el-menu-item>
        <el-divider/>
        <el-menu-item index="5" @click="dialogVisible = true">
          <el-icon>
            <setting/>
          </el-icon>
          <span>退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-aside>
  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
      :close-on-click-modal="false"
  >
    <span>确定退出登录？</span>
    <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false;determine()">确 定</el-button>
          </span>
  </el-dialog>

</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import router from "../../router";
import {ref} from "vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function click1() {
  router.push('/partition')
}
function click2() {
  router.push('/lexicon')
}
function click3() {
  router.push('/announcement')
}
function click4() {
  router.push('/adAuditor')
}
const dialogVisible = ref(false)
function determine() {
  sessionStorage.removeItem('token')
  router.push('/')
  location.reload()
}
</script>

<style scoped>

</style>