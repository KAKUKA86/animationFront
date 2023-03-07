<script lang="ts" setup>
import {useArticleStore} from "../store/Article"
import axios from 'axios';
import {useCommentStore} from "../store/Comment";
import {useRoute} from "vue-router";

const route = useRoute()
const articleStore = useArticleStore()
const commentStore = useCommentStore()
const arId = route.params.id;
const noId = sessionStorage.getItem('token') || '{}'
//通过arID查询文章及相关评论
axios.post('http://localhost:8088/queArticleAndCommentByArId',
    {arId: arId}, {responseType: 'json'})
    .then(response => {
      console.log(response.data)
      articleStore.article = response.data.article
      commentStore.commentList = response.data.commentList
      console.log(commentStore.commentList)
    }).catch(error => {
  console.log(error);
});

function submitComment() {
  console.log(noId)
  axios.post('http://localhost:8088/noUser/addCom',
      {noId: noId, arId: arId, coContent: commentStore.comment.coContent}, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        commentStore.commentList = response.data.commentList
        console.log(commentStore.commentList)
        location.reload()
      }).catch(error => {
    console.log(error);
  });
}
</script>
<template>
  <div>
    <h2>文章标题：{{ articleStore.article.arTitle }}</h2>
    <h1>test</h1>
    <div>以下是内容
      <div v-html="articleStore.article.arContent"></div>
    </div>

    <ul>
      <li>用户评论</li>
      <li v-for="(comment, index) in commentStore.commentList" :key="index">
        <div>{{ comment.noId }}</div>
        <div>{{ comment.coContent }}</div>
      </li>
    </ul>

    <el-form @submit.prevent="submitComment">
      <el-input v-model="commentStore.comment.coContent" type="textarea" placeholder="请输入评论内容"></el-input>
      <el-button type="primary" native-type="submit">提交评论</el-button>
    </el-form>
  </div>
</template>
<style scoped>
</style>