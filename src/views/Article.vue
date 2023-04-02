<script lang="ts" setup>
import {useArticleStore} from "../store/Article"
import axios from 'axios';
import {useCommentStore} from "../store/Comment";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import {reactive, ref} from "vue";
import {
  Watermelon,
  Pear
} from "@element-plus/icons-vue";

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
  if (sessionStorage.getItem('token') == null) {
    ElMessage.error('收藏请先登录')
    return
  }
  if (data.isFavorite) {
    axios.post('http://localhost:8088/noUser/delFavoriteByNoIdAndArtId',
        {noId: noId, arId: arId}, {responseType: 'json'})
        .then(response => {
          console.log(response.data)
          ElMessage.success('取消收藏成功')
          data.isFavorite = false
        }).catch(error => {
      console.log(error);
    });
  } else {
    axios.post('http://localhost:8088/noUser/addFavorite',
        {noId: noId, arId: arId}, {responseType: 'json'})
        .then(response => {
          console.log(response.data)
          ElMessage.success('收藏成功')
          data.isFavorite = true
        }).catch(error => {
      console.log(error);
    });
  }
}

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

function submitReport() {
  console.log("举报窗口")
  const data = {
    noId: noId,
    arId: arId,
    reContent: form.reason
  }
  if (sessionStorage.getItem('token') == null) {
    ElMessage.error('举报请先登录')
    return
  }
  if (form.reason == null) {
    ElMessage.error('举报内容不能为空')
    return
  } else if (form.reason.length > 100) {
    ElMessage.error('举报内容不能超过100字')
    return
  } else if (form.reason.length < 1) {
    ElMessage.error('举报内容不能少于1字')
    return
  }
  axios.post('http://localhost:8088/noUser/addReport', data, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        ElMessage.success('举报成功')
      }).catch(error => {
    console.log(error);
  });
}

const form = reactive({
  reason: '',
})

//点赞功能

/**
 * 重新梳理
 * 1.先查询是否点赞
 * 2.如果点赞了，就不让点赞
 * 3.如果没有点赞，就点赞
 * 4.点赞成功后，将点赞数+1
 * 5.将点赞信息存入数据库
 */

let isLiking = false
let like = 0

function actionLike() {

  isLiking = true
  //检测是否登录
  if (sessionStorage.getItem('token') == null) {
    ElMessage.error('点赞请先登录')
    return {
      isLiking: false,
      like: 0
    }
  }
  //检测是否点赞
  axios.post('http://localhost:8088/queLikeCountByNoIdAndArId',
      {noId: noId, arId: arId}, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        if (response.data.like === null) {
          //用户给文章点赞
          axios.post('http://localhost:8088/noUser/addArtLike',
              {noId: noId, arId: arId}, {responseType: 'json'})
              .then(response => {
                console.log(response.data)
                articleStore.article.arLike = articleStore.article.arLike + 1//点赞数+1
                //将点赞信息存入数据库
                axios.post('http://localhost:8088/addLike', {arId: arId, noId: noId}).then(response => {
                  console.log(response.data)
                  return {
                    isLiking: false,
                    like: 1
                  }
                }).catch(error => {
                  console.log(error);
                });

              }).catch(error => {
            isLiking = false
            like = 0
            console.log(error);
          });
        } else {
          ElMessage.error('您已经点过赞了')
          return {
            isLiking: false,
            like: 0
          }
        }
      }).catch(error => {
        isLiking = false
        like = 0
        console.log(error);
      }
  );
}

</script>
<template>
  <div class="cards-container">
    <el-card style="width: 800px" class="card">
      <h2>文章标题：{{ articleStore.article.arTitle }}</h2>
      <el-button :class="{'favorite-button' : true,'is-favorite' : isFavorite}" @click="toggleFavorite" type="button">
        {{ isFavorite ? '取消收藏' : '收藏' }}
      </el-button>
      <el-button type="warning" :icon="Watermelon" circle :disabled="isLiking === true"
                 @click="actionLike()"/>
      &nbsp;
      <span style="color: darkgray;font-size: 14px;font-family: 'Microsoft YaHei UI'">{{
          articleStore.article.arLike
        }}</span>
      <el-button type="warning" text @click="dialogFormVisible = true">举报</el-button>
      <div>浏览量：{{ articleStore.article.arView }}</div>
      <div>文章内容
        <div v-html="articleStore.article.arContent"></div>
      </div>

    </el-card>
    <el-card class="card">
      <el-form @submit.prevent="submitComment">
        <el-input v-model="commentStore.comment.coContent" type="textarea" placeholder="请输入评论内容"></el-input>
        <el-button type="primary" native-type="submit">提交评论</el-button>
      </el-form>
    </el-card>
    <el-card class="card">
      <ul>
        <li>用户评论</li>
        <li v-for="(comment, index) in commentStore.commentList" :key="index">
          <div>{{ comment.noId }}</div>
          <div>{{ comment.coContent }}</div>
        </li>
      </ul>
    </el-card>
  </div>

  <el-dialog v-model="dialogFormVisible" title="举报窗">
    <el-form :model="form" label-width="80px">
      <el-form-item label="举报原因" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.reason" placeholder="请输入举报原因"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReport();dialogFormVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style>
/*.cards-container {*/
/*  display: flex;*/
/*  flex-wrap: wrap;*/
/*}*/
.card {
  flex-basis: calc(50% - 16px); /* 50% width with 16px margin */
  margin: 8px;
}

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

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.icon {
  transform: scale(2);
}
</style>