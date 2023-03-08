<script lang="ts" setup>
import {useArticleStore} from "../store/Article"
import axios from 'axios';
import {toRaw} from "vue";
import router from "../router";

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
console.log(articles)
</script>
<template>
  <el-main>
    <el-container>
      <!-- 文章列表组件 -->
      <div><h3>目前用户为：{{ user }}</h3></div>
      <br>
      <h2>文章列表</h2>
      <ul>
        <li v-for="(article, index) in toRaw(articleStore.articleList)" :key="index">
          <router-link :to="{name: 'article', params: {id: article.arId}}">
            {{ article.arTitle }} ({{ article.arTime }})
          </router-link>
        </li>
      </ul>

      <el-aside>
        <div>
          <el-button type="primary" @click="addArticle()">
            <el-icon>
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                <path
                    d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"
                    fill="currentColor"></path>
              </svg>
            </el-icon>
            &nbsp;发布帖子
          </el-button>
        </div>
      </el-aside>
    </el-container>
  </el-main>
</template>

