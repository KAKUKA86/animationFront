<script lang="ts" setup>
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";
import router from "../../router";

const form = reactive({
  username: '',
  password: '',
  captcha: ''
})

function handleLogin(form: { username: string | null; password: string | null; captcha: string; }) {
  console.log(form.captcha)
  if (form.username == null) {
    ElMessage.error('用户名不能为空')
    return
  } else if (form.username.length > 20) {
    ElMessage.error('用户名不能超过20字')
    return
  } else if (form.username.length < 1) {
    ElMessage.error('用户名不能少于1字')
    return
  } else if (form.password == null) {
    ElMessage.error('密码不能为空')
    return
  } else if (form.password.length > 20) {
    ElMessage.error('密码不能超过20字')
    return
  } else if (form.password.length < 1) {
    ElMessage.error('密码不能少于1字')
    return
  }
  if (form.captcha === "管理员") {
    ElMessage.warning('以管理员身份登录')
    axios.post('http://localhost:8088/adUser/login',
        {adUsername: form.username, adUserPassword: form.password}, {responseType: 'json'})
        .then(response => {
          console.log(response.data)
          sessionStorage.setItem('token', JSON.stringify(response.data.adminUser))
          console.log("寄：" + JSON.parse(sessionStorage.getItem('token') || '{}').adId)
          router.push('/adminCenter')
        }).catch(error => {
      console.log(error);
      sessionStorage.clear()
      ElMessage.error('用户名或密码不正确')
      return
    })
  } else if (form.captcha === '审核员') {
    ElMessage.warning('以审核员身份登录')
    axios.post('http://localhost:8088/auUser/login',
        {auUsername: form.username, auUserPassword: form.password}, {responseType: 'json'})
        .then(response => {
          console.log(form.username)
          console.log(form.password)
          console.log(response.data)
          console.log(response.data.audiUser)
          sessionStorage.setItem('token', JSON.stringify(response.data.audiUser))
          console.log("寄" + JSON.parse(sessionStorage.getItem('token') || '{}').acode)
          router.push('/audiCenter')

        }).catch(error => {
      console.log(error);
      sessionStorage.clear()
      ElMessage.error('用户名或密码不正确')
      return
    })
  } else {
    ElMessage.error('发生意外错误，用户名或密码不正确')
  }
}

function roleText(form: { captcha: string; }) {
  if (form.captcha == '1') {
    return '管理员'
  } else if (form.captcha == '2') {
    return '审核员'
  } else {
    return form.captcha
  }
}

function updateRole() {
  form.captcha = roleText(form)
}
</script>
<template>
  <el-main>
    <el-card>
      <h1>后台登录页面</h1>
      <el-col span="24">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"/>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input type="text" v-model="form.captcha" @input="updateRole" placeholder="请输入验证码"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin(form)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
  </el-main>
</template>


<style scoped>

</style>