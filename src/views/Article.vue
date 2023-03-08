<script lang="ts" setup>
import {useArticleStore} from "../store/Article"
import axios from 'axios';
import {useCommentStore} from "../store/Comment";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import {
  Star,
} from '@element-plus/icons-vue'
import {reactive} from "vue";

const route = useRoute()
const articleStore = useArticleStore()
const commentStore = useCommentStore()
const arId = route.params.id;
const user = JSON.parse(sessionStorage.getItem('token') || '{}');
const noId = user.noId;

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
  if (sessionStorage.getItem('token') == null) {
    ElMessage.error('评论请先登录')
    return
  } else if (commentStore.comment.coContent == null) {
    ElMessage.error('评论内容不能为空')
    return
  } else if (commentStore.comment.coContent.length > 100) {
    ElMessage.error('评论内容不能超过100字')
    return
  } else if (commentStore.comment.coContent.length < 1) {
    ElMessage.error('评论内容不能少于1字')
    return
  } else {
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
}
let isFavorite = false
const data = reactive({
  isFavorite: false,
})
const toggleFavorite = () => {
  if (data.isFavorite) {
    axios.post('http://localhost:8088/noUser/delFavorite',
        {noId: noId, arId: arId}, {responseType: 'json'})
        .then(response => {
          console.log(response.data)
          data.isFavorite = false
        }).catch(error => {
      console.log(error);
    });
  } else {
    axios.post('http://localhost:8088/noUser/addFavorite',
        {noId: noId, arId: arId}, {responseType: 'json'})
        .then(response => {
          console.log(response.data)
          data.isFavorite = true
        }).catch(error => {
      console.log(error);
    });
  }
}
</script>
<template>
  <el-card><h2>文章标题：{{ articleStore.article.arTitle }}</h2>
    <h1>test</h1>

      <button :class="{'favorite-button' : true,'is-favorite' : isFavorite}" @click="toggleFavorite" type="button">{{isFavorite ? '取消收藏' : '收藏'}}</button>

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
  </el-card>
</template>
<style >
  .favorite-button {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }

  .is-favorite {
    color: #ff9900;
    border-color: #ff9900;
  }
</style>