<script lang="ts" setup>
import {useUserStore} from "../../store/User";
import {reactive, toRaw} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const user = JSON.parse(sessionStorage.getItem('token') || '{}')
const userStore = useUserStore()
userStore.user = user
const form = reactive({
  noUsername: '',
  noUserPassword: '',
  noGender: '',
  noEmail: '',
})

function submitForm() {
  console.log('submit!')
  const data = {
    noId: userStore.user.noId,
    noUsername: form.noUsername,
    noUserPassword: form.noUserPassword,
    noGender: form.noGender,
    noEmail: form.noEmail
  }
  axios.post("http://localhost:8088/noUser/updUser", data, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        if (response.data.code === 500) {
          userStore.user = response.data.user
          sessionStorage.setItem('token', JSON.stringify(userStore.user))
          ElMessage({
            message: '修改成功',
            type: 'success'
          })
          location.reload()
        } else {
          ElMessage({
            message: '修改失败',
            type: 'error'
          })
        }
      }).catch(error => {
    console.log(error);
  });
}
</script>
<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名" prop="noUsername">
        <el-input v-model="form.noUsername" :placeholder="`${userStore.user.noUsername}`"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="noUserPassword">
        <el-input v-model="form.noUserPassword" :placeholder="`${userStore.user.noUserPassword}`"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="noGender">
        <el-radio-group v-model="form.noGender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="noEmail">
        <el-input v-model="form.noEmail" :placeholder="`${userStore.user.noEmail}`"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style scoped>

</style>