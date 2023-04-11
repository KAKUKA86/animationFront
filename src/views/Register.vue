<script lang="ts" setup>
import {reactive} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "../router";


const form = reactive({
  noUsername: '',
  noUserPassword: '',
  isUserPassword: '',
  noGender: '',
  noBirthday: '',
  noEmail: ''
})

function submitForm(form: any) {
  const url = 'http://localhost:8088/noUser/signIn';
  const noBirthday = new Date().setTime(form.noBirthday)
  console.log(typeof noBirthday)
  if (form.noUsername === '') {
    ElMessage.error('用户名不能为空')
    return
  } else if (form.noUserPassword === '') {
    ElMessage.error('密码不能为空')
    return
  } else if (form.isUserPassword === '') {
    ElMessage.error('确认密码不能为空')
    return
  } else if (form.noGender === '') {
    ElMessage.error('性别不能为空')
    return
  } else if (form.noBirthday === '') {
    ElMessage.error('生日不能为空')
    return
  } else if (form.noBirthday > Date.parse(new Date().toString())){
    ElMessage.error('生日不能大于当前时间')
    return
  }
  else if (form.noEmail === '') {
    ElMessage.error('邮箱不能为空')
    return
  } else if (form.noUserPassword !== form.isUserPassword) {
    ElMessage.error('两次密码不一致')
    return
  }
  axios.post(url,{
    noUsername: form.noUsername,
    noUserPassword: form.noUserPassword,
    noGender: form.noGender,
    noBirthday: noBirthday,
    noEmail: form.noEmail
  }, {responseType: "json"})
      .then(res => {
            console.log(res.data.code)
            if (res.data.code === 200) {
              ElMessage.success(res.data.message);
              router.push('/');
            } else {
              ElMessage.error(res.data.message);
            }
          }
      )

}
function resetForm(form : any) {
  form.noUsername = '';
  form.noUserPassword = '';
  form.isUserPassword = '';
  form.noGender = '';
  form.noBirthday = '';
  form.noEmail = '';
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
        <el-input v-model="form.noUserPassword" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.isUserPassword" type="password"/>
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