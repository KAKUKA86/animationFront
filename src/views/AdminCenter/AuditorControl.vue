<script lang="ts" setup>
import {useAuditorStore} from "../../store/Auditor";
import axios from "axios";
import {reactive, ref} from "vue";

const auditorStore = useAuditorStore()
//dialog准备
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  auId: 0,
  auUsername: '',
  auUserPassword: '',

})

//查询
axios.post('http://localhost:8088/adUser/queAudi', {}, {responseType: 'json'})
    .then(response => {
      auditorStore.auditorList = response.data.audiUserList
      console.log(auditorStore.auditorList)
    }).catch(error => {
      console.log(error);
    }
)

//删除
function del(row: { auId: number; }) {
  axios.post('http://localhost:8088/adUser/delAudi', {auId: row.auId}, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        location.reload()
      }).catch(error => {
        console.log(error);
      }
  )
}//新增
function add() {
  dialogFormVisible.value = true
  form.auUsername = ''
  form.auUserPassword = ''
}

function submitAdd() {
  const data = {
    auUsername: form.auUsername,
    auUserPassword: form.auUserPassword
  }
  axios.post('http://localhost:8088/adUser/addAudi', data, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        dialogFormVisible.value = false
        location.reload()
      }).catch(error => {
        console.log(error);
      }
  )
}
//编辑
function edit(row: { auId: number; auUsername: string; auUserPassword: string; }) {
  dialogFormVisible2.value = true
  form.auId = row.auId
  form.auUsername = row.auUsername
  form.auUserPassword = row.auUserPassword
}

function submitEdit() {
  const data = {
    auId: form.auId,
    auUsername: form.auUsername,
    auUserPassword: form.auUserPassword
  }
  axios.post('http://localhost:8088/adUser/updAudi', data, {responseType: 'json'})
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
    <div style="float: left"><h2>审核员管理</h2></div>
    <div style="float: right">
      <el-button type="primary" @click="add">新增</el-button>

    </div>
    <el-table :data="auditorStore.auditorList" style="width: 100%">
      <el-table-column prop="auId" label="审核员ID" width="180">
      </el-table-column>
      <el-table-column prop="auUsername" label="审核员姓名" width="180">
      </el-table-column>
      <el-table-column prop="auUserPassword" label="审核员密码" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="warning" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="新增审核员">
      <el-form :model="form" label-width="100px">
        <el-form-item label="审核员名">
          <el-input v-model="form.auUsername"></el-input>
        </el-form-item>
        <el-form-item label="审核员密码">
          <el-input v-model="form.auUserPassword"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd();">确 定</el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisible2" title="编辑审核员">
      <el-form :model="form" label-width="180px">
        <el-form-item label="审核员名">
          <el-input v-model="form.auUsername"></el-input>
        </el-form-item>
        <el-form-item label="审核员密码">
          <el-input v-model="form.auUserPassword"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit();">确 定</el-button>
      </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<style scoped>

</style>