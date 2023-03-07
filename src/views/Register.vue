<script lang="ts" setup>
import {reactive} from "vue";
import axios from "axios";
import MyComponent from "../utils/Login";

const form = reactive({
  noUsername: '',
  noUserPassword: '',
  noGender: '',
  noBirthday: '',
  noEmail: ''
})
function submitForm(form: any) {
  const url = 'http://localhost:8088/noUser/register';
  const params = {
    noUsername: form.noUsername,
    noUserPassword: form.noUserPassword,
    noGender: form.noGender,
    noBirthday: form.noBirthday,
    noEmail: form.noEmail
  };
  // axios.post(url, params)
  //     .then(res => {
  //       console.log(res.data.code)
  //       if (res.data.code === 200) {
  //         (this as unknown as MyComponent).$message.success(res.data.message);
  //         const token = res.data.user.noId
  //         sessionStorage.setItem('token', token)
  //         this.$router.push('/');
  //       } else {
  //         (this as unknown as MyComponent).$message.error(res.data.message);
  //       }
  //     });
}
</script>
<template>
  <div style="margin-top: 20px">
    <!--注册组件-->
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.noUsername"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.noUserPassword"/>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.noUserPassword"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.noGender">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
            v-model="form.noBirthday"
            type="timestamp"
            placeholder="选择日期"
            style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.noEmail"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(form)">注册</el-button>
        <el-button @click="resetForm(form)">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>


<style scoped>

</style>