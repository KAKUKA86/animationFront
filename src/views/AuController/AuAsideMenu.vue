<template>
  <el-aside style="width: 280px;height:100%;">
    <el-col :span="24">
      <h1 class="mb-2">审核员后台仪表盘</h1>
      <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="0"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-menu-item-group title="主要功能"/>
        <el-menu-item index="1" @click="click1()">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>文章审核</span>
        </el-menu-item>
        <el-menu-item index="2" @click="click2()">
          <el-icon>
            <document/>
          </el-icon>
          <span>用户管理</span>
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
  router.push('/audiArticle')
}

function click2() {
  router.push('/audiUser')
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