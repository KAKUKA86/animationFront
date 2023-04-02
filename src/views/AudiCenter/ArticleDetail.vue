<template>
  <el-card class="my-card">
    <h3>文章标题：{{articleStore.article.arTitle}}</h3>
    <el-divider/>
    <div>
      <h3>文章内容：</h3>
      <div v-html="articleStore.article.arContent"></div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {useArticleStore} from "../../store/Article";
import axios from "axios";

const route = useRoute()
const arId = route.query.arId
const articleStore = useArticleStore()

console.log(arId)
axios.post('http://localhost:8088/queArticleByArId',
    {arId: arId}, {responseType: 'json'})
    .then(response => {
      console.log(response.data)
      articleStore.article = response.data.article
    }).catch(error => {
  console.log(error);
})
</script>

<style>
.my-card{
  margin-top: 20px;
  width: 900px;
  height: 500px;
  overflow: auto;
}
</style>