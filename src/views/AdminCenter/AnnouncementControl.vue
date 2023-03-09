<script lang="ts" setup>

import {useAnnouncementStore} from "../../store/Announcement";
import axios from "axios";
import {reactive, ref} from "vue";
import {
  Plus
} from "@element-plus/icons-vue";

const announcementStore = useAnnouncementStore()
const adminUser = JSON.parse(sessionStorage.getItem('token') || '{}');
const adId = adminUser.adId;
//以下为dialog准备
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  adId: 0,
  anTitle: '',
  anContent: '',
  anTimeLimit: 0
})
//以下为查询公告的代码
axios.post('http://localhost:8088/adUser/queAnnounce', {}, {responseType: 'json'})
    .then(response => {
      announcementStore.announcementList = response.data.announcementList
      console.log(announcementStore.announcementList)
    }).catch(error => {
      console.log(error);
    }
)
//以下为删除公告的代码
function del(row: { anId: number; }) {
  axios.post('http://localhost:8088/adUser/delAnnounce', {anId: row.anId}, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        location.reload()
      }).catch(error => {
        console.log(error);
      }
  )
}
//以下为新增公告的代码
function add() {
  dialogFormVisible.value = true
  form.adId = 0
  form.anTitle = ''
  form.anContent = ''
  form.anTimeLimit = 0
}
function submitAdd() {
  const data = {
    adId: adId,
    anTitle: form.anTitle,
    anContent: form.anContent,
    anTimeLimit: form.anTimeLimit
  }
  axios.post('http://localhost:8088/adUser/addAnnounce', data, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        dialogFormVisible.value = false
        location.reload()
      }).catch(error => {
        console.log(error);
      }
  )
}
</script>
<template>
<el-card style="margin-top: 20px">
  <div style="float: left"><h2>公告管理</h2></div>
  <div style="float: right">
    <el-button type="primary" @click="add">
      <el-icon>
        <Plus/>
      </el-icon>&nbsp;新增公告</el-button>
  </div>
  <el-table :data="announcementStore.announcementList" style="width: 100%">
    <el-table-column label="公告编号" prop="anId"/>
    <el-table-column label="公告标题" prop="anTitle"/>
    <el-table-column label="公告内容" prop="anContent"/>
    <el-table-column label="公告创建时间" prop="anCreationTime"/>
    <el-table-column label="公告是否有时间限制" prop="anTimeLimit"/>
    <el-table-column label="公告创建人" prop="adId"/>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="danger" @click="del(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="新增公告">
    <el-form :model="form" label-width="150px">
      <el-form-item label="公告标题">
        <el-input v-model="form.anTitle"></el-input>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input v-model="form.anContent"></el-input>
      </el-form-item>
      <el-form-item label="公告是否有时间限制">
        <el-radio-group v-model="form.anTimeLimit">
          <el-radio  label="1">有</el-radio>
          <el-radio  label="0">无</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd();">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</el-card>
</template>
<style scoped>

</style>