<script lang="ts" setup>
import MyArticle from "./UserCenter/MyArticle.vue";
import MyComment from "./UserCenter/MyComment.vue";
import MyFavorite from "./UserCenter/MyFavorite.vue";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const user = JSON.parse(sessionStorage.getItem('token') || '{}')
const noUsername = user.noUsername
const noId = user.noId
const view = ref(1)
</script>
<template>
  <el-container>
    <el-header>
      <el-row style="margin-top: 20px;">
        <div style="width: 1000px;padding: 20px " class="namespace">
          <div>
            <div style="display: block">
              <span class="username">{{ noUsername }}</span>
              <br>
              <span class="uid">用户ID：{{ noId }}</span>
              <div style="float: right;position: relative;right: 0; bottom: 25px">
                <el-button type="primary" size="large">编辑</el-button>
              </div>
            </div>
          </div>
          <div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-row>
    </el-header>
    <el-container style="margin-top: 100px">
      <el-aside>
        <el-col :span="20">
          <h5 class="mb-2">个人中心</h5>
          <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
          >
            <el-menu-item index="1" @click="view = 1">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span>我的帖子</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2" @click="view=2">
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>我的评论</span>
            </el-menu-item>
            <el-divider/>
            <el-menu-item index="3" @click="view=3">
              <el-icon>
                <document/>
              </el-icon>
              <span>我的收藏</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <setting/>
              </el-icon>
              <span>编辑资料</span>
            </el-menu-item>
            <el-divider/>
            <el-menu-item index="5">
              <el-icon>
                <setting/>
              </el-icon>
              <span>退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <el-card>
          <MyArticle v-if="view===1"/>
          <MyComment v-if="view===2"/>
          <MyFavorite v-if="view===3"/>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>


<style scoped>
.namespace {
  border: 1px solid var(--el-border-color);
}

.username {
  font-size: 20px;
}

.uid {
  font-size: 10px;
  color: darkgray;
}
</style>