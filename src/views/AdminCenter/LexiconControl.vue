<script lang="ts" setup>
import {Plus} from "@element-plus/icons-vue";
import {useLexiconStore} from "../../store/Lexicon";
import axios from "axios";
import {reactive, ref} from "vue";

const lexiconStore = useLexiconStore()
//dialog准备
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  adId: 0,
  leWord: '',
})
const adminUser = JSON.parse(sessionStorage.getItem('token') || '{}');
const adId = adminUser.adId;
axios.post('http://localhost:8088/adUser/queLexicon', {}, {responseType: 'json'})
    .then(response => {
      lexiconStore.lexiconList = response.data.lexiconList
      console.log(lexiconStore.lexiconList)
    }).catch(error => {
  console.log(error);
})

//删除词
function del(row: { leId: number; }) {
  axios.post('http://localhost:8088/adUser/delLexicon', {leId: row.leId}, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        location.reload()
      }).catch(error => {
    console.log(error);
  })
}

//新增词
function add() {
  dialogFormVisible.value = true
  form.leWord = ''
  form.adId = 0
}

function submitAdd() {
  const data = {
    leWord: form.leWord,
    adId: adId
  }
  axios.post('http://localhost:8088/adUser/addLexicon', data, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        dialogFormVisible.value = false
        location.reload()
      }).catch(error => {
    console.log(error);
  })
}
</script>
<template>
  <el-card style="width: 900px;margin-top:20px">
    <div style="float: left"><h2>词库管理</h2></div>
    <div style="float: right">
      <el-button type="primary" @click="add">
        <el-icon>
          <Plus/>
        </el-icon>&nbsp;新增词
      </el-button>
    </div>
    <el-table
        :data="lexiconStore.lexiconList"
        style="width: 100%"
    >
      <el-table-column label="词库编号" prop="leId"/>
      <el-table-column label="词库名称" prop="leWord"/>
      <el-table-column label="词库创建时间" prop="leCreationTime"/>
      <el-table-column label="词库使用次数" prop="adId"/>
      <el-table-column label="词库创建人" prop="adId"/>
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="新增词">
    <el-form :model="form" label-width="80px">
      <el-form-item label="词">
        <el-input v-model="form.leWord"></el-input>
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