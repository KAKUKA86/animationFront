<script lang="ts" setup>
import {useArticleStore} from "../store/Article"
import axios from 'axios';
import {toRaw} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();
const articleStore = useArticleStore()
const articles = toRaw(articleStore.articleList)

axios.post('http://localhost:8088/noUser/queAllArt', {}, {responseType: 'json'})
    .then(response => {
      console.log(response.data)
      articleStore.articleList = response.data.articleList
      console.log(articleStore.articleList)
      console.log(articles.values())
    }).catch(error => {
  console.log(error);
});
</script>
<template>
  <el-main>
    <!-- 文章列表组件 -->
    <h2>文章列表</h2>
    <ul>
      <li v-for="(article, index) in articles" :key="index">
        <router-link :to="{name: 'article', params: {id: article.arId}}">
          {{ article.arTitle }} ({{ article.arTime}})
        </router-link>
      </li>
    </ul>
  </el-main>
</template>
