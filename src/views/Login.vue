<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>登录</h1>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {ElForm, ElFormItem, ElInput, ElButton,} from 'element-plus';
import axios from "axios";
import MyComponent from "../utils/Login";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
    };
  },
  methods: {
    handleLogin() {
      (this.$refs.form as any).validate((valid: boolean) => {
        if (valid) {
          const url = 'http://localhost:8088/noUser/login';
          const params = {
            noUsername: this.form.username,
            noUserPassword: this.form.password,
          };
          axios.post(url, params)
              .then(res => {
                console.log(res.data.code)
                if (res.data.code === 200) {
                  (this as unknown as MyComponent).$message.success(res.data.message);
                  const token = res.data.user.noId
                  sessionStorage.setItem('token', token)
                  this.$router.push('/');
                } else {
                  (this as unknown as MyComponent).$message.error(res.data.message);
                }
              });
        }
      })
    },
  },
});
</script>

<style scoped>
.login-container {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f7f7f7;
  margin: auto;
}

.login-box {
  width: 400px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.login-header {
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.login-form {
  padding: 20px;
}

.login-button {
  width: 100%;
}
</style>
