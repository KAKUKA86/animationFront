<template>
  <el-card>
    <h2>登录</h2>
    <el-form
        ref="loginFormRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="login-form"
        status-icon
    >
      <el-form-item label="用户名" prop="noUsername">
        <el-input v-model="form.noUsername" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="密码" prop="noUserPassword">
        <el-input v-model="form.noUserPassword" placeholder="请输入密码" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {ElForm, ElFormItem, ElInput, ElButton, ElMessage, FormRules, FormInstance} from 'element-plus';
import axios from "axios";
import router from "../router";

const validateNoUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else {
    console.log(value)
    callback();
  }
};
const validateNoUserPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  }
};
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  noUsername: '',
  noUserPassword: ''
});
const rules = reactive<FormRules>({
  noUsername: [{validator: validateNoUsername, trigger: 'blur'}],
  noUserPassword: [{validator: validateNoUserPassword, trigger: 'blur'}]
})


function handleLogin() {
  axios.post('http://localhost:8088/noUser/login', form, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        if (response.data.code === 200) {
          ElMessage.success('登录成功');
          sessionStorage.setItem('token', JSON.stringify(response.data.user))
          router.push({name: 'home'})
        } else {
          ElMessage.error(response.data.message);
        }
      }).catch(error => {
    console.log(error);
  });
}

</script>

<style>

</style>
