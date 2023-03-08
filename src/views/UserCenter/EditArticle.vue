<script lang="ts" setup>
import {reactive} from 'vue';
import {useRoute} from "vue-router";
import router from "../../router";
import {ElMessage} from "element-plus";
import axios from "axios";
import {usePartitionStore} from "../../store/Partition";

const noUser = JSON.parse(sessionStorage.getItem('token') || '{}');
const noId = noUser.noId;
const {query} = useRoute();
const arId = query.arId;
const partitionStore = usePartitionStore();
const rules = reactive({
  title: [
    {required: true, message: '请输入标题', trigger: 'blur'},
    {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
  ],
  partition: [
    {required: true, message: '请选择分区', trigger: 'change'}
  ],
  content: [
    {required: true, message: '请输入内容', trigger: 'blur'},
    {min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur'}
  ]
});
const form = reactive({
  title: '',
  content: '',
  partition: ''
});

function editArticle(form: any) {
  const url = 'http://localhost:8088/noUser/updArt';
  axios.post(url, {
    noId: noId,
    arId: arId,
    paId: form.partition,
    arTitle: form.title,
    arContent: form.content
  }, {responseType: "json"})
      .then(res => {
        if (res.data.code === 200) {
          ElMessage.success(res.data.message);
          console.log(form.title, form.content, noId, arId)
          ElMessage.success('修改成功');
          console.log(arId, noId, form.title, form.content)
          router.push('/center');
        } else {
          ElMessage.error(res.data.message);
        }
      })
}

function back() {
  router.back();
}

axios.post('http://localhost:8088/noUser/queArtPart', {}, {responseType: 'json'})
    .then(response => {
      partitionStore.partitionList = response.data.data
      console.log(partitionStore.partitionList)
    }).catch(error => {
      console.log(error);
    }
)

</script>
<template>

    <el-card style="margin-top: 20px">
      <h1>修改帖子 {{ arId }}</h1>
      <el-form :model="form" :rules="rules" label-width="120px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="板块" prop="paId">
          <el-select v-model="form.partition" placeholder="请选择">
            <el-option
                v-for="item in partitionStore.partitionList"
                :key="item.paId"
                :label="item.paName"
                :value="item.paId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="form.content"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editArticle(form)">修改</el-button>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>

</template>


<style scoped>

</style>