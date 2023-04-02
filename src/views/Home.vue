<script lang="ts" setup>
import {
  EditPen
} from "@element-plus/icons-vue";
import {useArticleStore} from "../store/Article"
import axios from 'axios';
import {toRaw} from "vue";
import router from "../router";
import {useAnnouncementStore} from "../store/Announcement";

const announcementStore = useAnnouncementStore()
const announcements = toRaw(announcementStore.announcementList)
const articleStore = useArticleStore()
const articles = toRaw(articleStore.articleList)

axios.post('http://localhost:8088/noUser/queAllArt', {}, {responseType: 'json'})
    .then(response => {
      console.log(response.data)
      articleStore.articleList = response.data.articleList
    }).catch(error => {
  console.log(error);
});

function addArticle() {
  router.push({name: 'addArticle'})
}

const normalUser = JSON.parse(sessionStorage.getItem('token') || '{}')
const user = normalUser.noUsername
console.log("HOME打印Token:" + normalUser.acode)
axios.get('http://localhost:8088/noUser/queAnnouncement')
    .then(response => {
      console.log(response.data)
      announcementStore.announcementList = response.data.announcementList
    }).catch(error => {
  console.log(error);
});
function setTime(time: any) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return year + '年' + month + '月' + day + '日' + hour + ':' + minute + ':' + second
}
</script>
<template>
  <el-main>
    <el-container>
      <!-- 文章列表组件 -->
      <div class="card-container">
        <el-card class="card-item">
          <div>
            <h3 v-if="user != null">目前用户为：{{ user }}</h3>
            <h3 v-if="user == null">游客您好</h3>
          </div>
        </el-card>
        <el-card class="card-item">
          <h2>文章列表</h2>
        </el-card>
        <el-card v-for="(article, index) in toRaw(articleStore.articleList)" :key="index" class="card-item">
          <router-link :to="{name: 'article', params: {id: article.arId}}" class="router-link">
            {{ article.arTitle }} ({{ setTime(article.arTime) }})
          </router-link>
          <el-divider/>
        </el-card>
      </div>
      <el-aside>
        <div>
          <el-card style="margin-left:20px">
            <el-button type="primary" size="large" @click="addArticle()">
              <el-icon>
                <EditPen/>
              </el-icon>
              &nbsp;发布文章
            </el-button>
          </el-card>
          <div style="overflow: auto; height: 500px; margin-top: 20px">
            <el-card style="margin-left: 20px;">
              <h5>系统信息</h5>
              <el-divider/>
              <el-card v-for="(announcement, index) in toRaw(announcementStore.announcementList)" :key="index"
                       class="card-item">
                {{ announcement.anTitle }}
                <el-divider/>
                {{ announcement.anContent}}
              </el-card>
            </el-card>
          </div>
        </div>
      </el-aside>
    </el-container>
  </el-main>
</template>
<style>
.card-container {
  width: 830px;
  display: flex;
  flex-direction: column;
  height: 900px;
  flex: auto;
}

.card-item {
  width: 100%;
  margin-bottom: 20px;
}

.router-link {
  text-decoration: none;
}
</style>

