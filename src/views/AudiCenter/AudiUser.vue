<template>
  <el-card>
    <h1>欢迎来到用户页面</h1>
    <el-table
        :data="userStore.userList"
        style="width: 100%"
        height="400"
    >
      <el-table-column prop="noId" label="用户编号"/>
      <el-table-column prop="noUsername" label="用户名" width="100"/>
      <el-table-column prop="noGender" label="用户性别"/>
      <el-table-column prop="noBirthday" label="用户生日" width="200">
        <template #default="{row}">
          {{getTime(row.noBirthday)}}
        </template>
      </el-table-column>
      <el-table-column prop="noEmail" label="用户邮箱"/>
      <el-table-column prop="noUserStatus" label="用户状态">
        <template #default="{row}">
          <el-tag v-if="row.noUserStatus === 0" type="info">正常</el-tag>
          <el-tag v-else-if="row.noUserStatus === 1" type="warning">封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="noReportCount" label="用户被举报次数" width="130"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              v-if="scope.row.noUserStatus === 0"
              type="primary"
              size="small"
              @click="handleBan(scope.row.noId)"
          >封禁
          </el-button>
          <br>
          <el-button
              v-if="scope.row.noUserStatus === 1"
              type="danger"
              size="small"
              @click="handleNoBan(scope.row.noId)"
          >解除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import {useUserStore} from "../../store/User";
import axios from "axios";

const userStore = useUserStore()
axios.get('http://localhost:8088/auUser/queAllUser')
    .then(res => {
      userStore.userList = res.data.userList
    }).catch(err => {
  console.log(err)
})

/**
 * 设想：后台返回的是未登录时间超过一年的用户和举报次数超过三次的用户
 * 然后在前端列数来显示
 * 审核员可以对用户进行封禁
 * 系统怎么做到封禁时间结束后自动解封？
 * 需要增加一个字段，记录封禁时间
 * 新增字段：封禁时间，封禁次数
 *
 * 前端需要将两个结果合并
 */
function handleBan(id: number) {
  console.log(id)
  axios.post('http://localhost:8088/auUser/banUser', {
    noId: id
  }).then(res => {
    if (res.data.code === 200) {
      userStore.user = res.data.user
      location.reload()
    }
  }).catch(err => {
    console.log(err)
  })
}

function handleNoBan(id: number) {
  console.log(id)
  axios.post('http://localhost:8088/auUser/unBanUser', {
    noId: id
  }).then(res => {
    if (res.data.code === 200) {
      userStore.user = res.data.user
      location.reload()
    }
  }).catch(err => {
    console.log(err)
  })
}
function getTime (time: any) {
  const date = new Date(time)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  return Y + M + D
}
</script>

<style scoped>

</style>