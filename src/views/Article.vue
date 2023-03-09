<script lang="ts" setup>
import {useArticleStore} from "../store/Article"
import axios from 'axios';
import {useCommentStore} from "../store/Comment";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import {
  Star,
} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";

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
    axios.post('http://localhost:8088/noUser/delFavoriteByNoIdAndArtId',
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

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

function submitReport(){
  console.log("举报窗口")
  const data = {
    noId: noId,
    arId: arId,
    reContent: form.reason
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
</script>
<template>
  <el-card><h2>文章标题：{{ articleStore.article.arTitle }}</h2>
    <h1>test</h1>
    <el-button :class="{'favorite-button' : true,'is-favorite' : isFavorite}" @click="toggleFavorite" type="button">
      {{ isFavorite ? '取消收藏' : '收藏' }}
    </el-button>
    <el-button type="warning" text @click="dialogFormVisible = true">举报</el-button>
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
</style>