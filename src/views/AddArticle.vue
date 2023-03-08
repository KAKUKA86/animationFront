<script lang="ts" setup>
import {reactive} from 'vue'
import axios from "axios";
import {usePartitionStore} from "../store/Partition";
import router from "../router";
import {ElMessage} from "element-plus";

const user = JSON.parse(sessionStorage.getItem('token') || '{}')
const noId = user.noId
const form = reactive({
  title: '',
  paId: '',
  article: ''
})
const partitionStore = usePartitionStore()
const onSubmit = () => {
  console.log('submit!')
  if (form.title == null) {
    ElMessage.error('标题不能为空')
    return
  } else if (form.title.length > 20) {
    ElMessage.error('标题不能超过20字')
    return
  } else if (form.title.length < 1) {
    ElMessage.error('标题不能少于1字')
    return
  } else if (form.paId == null) {
    ElMessage.error('请选择分区')
    return
  } else if (form.article == null) {
    ElMessage.error('文章内容不能为空')
    return
  } else if (form.article.length > 10000) {
    ElMessage.error('文章内容不能超过10000字')
    return
  } else if (form.article.length < 1) {
    ElMessage.error('文章内容不能少于1字')
    return
  } else {
    axios.post('http://localhost:8088/noUser/addArt',
        {noId: noId, arTitle: form.title, paId: form.paId, arContent: form.article}, {responseType: 'json'})
        .then(response => {
          console.log(response.data)
        }).catch(error => {
      console.log(error);
    });
  }

}

axios.post('http://localhost:8088/noUser/queArtPart', {}, {responseType: 'json'})
    .then(response => {
      partitionStore.partitionList = response.data.data
      console.log(response.data.data)
    }).catch(error => {
  console.log(error);
});

function back() {
  router.push('/')
}
</script>
<template>
  <el-card style="margin-top: 20px">
    <h2>文章投稿</h2>
    <el-form :model="form" label-width="120px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="投稿分区">
        <el-select v-model="form.paId" placeholder="请选择分区">
          <el-option v-for="partition in partitionStore.partitionList" :key="partition.paId" :label="partition.paName"
                     :value="partition.paId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="form.article" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

