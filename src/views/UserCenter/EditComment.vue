<script lang="ts" setup>
import {useRoute} from "vue-router";
import {reactive} from "vue";
import router from "../../router";
import axios from "axios";
import {ElMessage} from "element-plus";
const {query} = useRoute();
const coId = query.coId;
const rules = reactive({
  content: [
    {required: true, message: '请输入内容', trigger: 'blur'},
    {min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur'}
  ]
});
const form = reactive({
  content: ''
});
function editComment(form: any) {
  const url = 'http://localhost:8088/noUser/updCom';
  axios.post(url, {
    coId: coId,
    coContent: form.content
  }, {responseType: "json"})
      .then(res => {
        if (res.data.code === 200) {
          ElMessage.success(res.data.message);
          console.log(form.content, coId)
          ElMessage.success('修改成功');
          console.log(coId, form.content)
          router.push('/center');
        } else {
          ElMessage.error(res.data.message);
        }
      })
}
function back() {
  router.back();
}
</script>
<template>
<el-card>
  <h1>修改评论 {{ coId }}</h1>
  <el-form :model="form" :rules="rules" label-width="120px">
    <el-form-item label="内容" prop="content">
      <el-input v-model="form.content"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="editComment(form)">修改</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>
<style scoped>

</style>