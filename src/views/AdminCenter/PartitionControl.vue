<script lang="ts" setup>
import {usePartitionStore} from "../../store/Partition";
import axios from "axios";
import {reactive, ref} from "vue";

const adminUser = JSON.parse(sessionStorage.getItem('token') || '{}');
const adId = adminUser.adId;
const partitionStore = usePartitionStore()
import {
  Plus
} from "@element-plus/icons-vue";

axios.post('http://localhost:8088/adUser/quePartition', {}, {responseType: 'json'})
    .then(response => {
      partitionStore.partitionList = response.data.partitionList
      console.log(partitionStore.partitionList)
    }).catch(error => {
      console.log(error);
    }
)
//现在这些编号都存在了partitionStore.partitionList中
//提供分区编号给后台，后台返回该分区下的文章数量
for (let i = 0; i < partitionStore.partitionList.length; i++) {
  axios.post('http://localhost:8088/queArticleCountByPaId', {paId: partitionStore.partitionList[i].paId}, {responseType: 'json'})
      .then(response => {
        partitionStore.partitionList[i].paArticleCount = response.data.articleCount
        console.log(partitionStore.partitionList)
      }).catch(error => {
        console.log(error);
      }
  )
}

//以下是编辑分区的代码
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  paId: 0,
  paName: '',
})

function edit(row: { paId: number; paName: string; }) {
  dialogFormVisible2.value = true
  form.paId = row.paId
  form.paName = row.paName
}

//这是编辑分区的代码
function submitEdit() {
  const data = {
    paName: form.paName,
    adId: adId,
    paId: form.paId
  }
  console.log(data.paId)
  axios.post('http://localhost:8088/adUser/updPartition', data, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        dialogFormVisible.value = false
        location.reload()
      }).catch(error => {
        console.log(error);
      }
  )
}

//以下是删除分区的代码
function del(row: { paId: number; }) {
  axios.post('http://localhost:8088/adUser/delPartition', {paId: row.paId}, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        location.reload()
      }).catch(error => {
        console.log(error);
      }
  )
}

//以下为新增分区的代码
function add() {
  dialogFormVisible.value = true
  form.paId = 0
  form.paName = ''
}

function submitAdd() {
  const data = {
    paName: form.paName,
    adId: adId,
    paId: form.paId
  }
  console.log(data.paId)
  axios.post('http://localhost:8088/adUser/addPartition', data, {responseType: 'json'})
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
  <el-card style="width: 900px;margin-top:20px ">
    <div style="float: left"><h2>分区查询</h2></div>
    <div style="float: right">
      <el-button @click="add" type="primary">
        <el-icon>
          <Plus/>
        </el-icon>&nbsp;新增分区
      </el-button>
    </div>
    <el-table
        :data="partitionStore.partitionList"
        style="width: 100%">
      <el-table-column label="分区编号" prop="paId"/>
      <el-table-column label="分区名称" prop="paName"/>
      <el-table-column label="分区创建时间" prop="paCreationTime"/>
      <el-table-column label="分区创建人" prop="adId"/>
      <el-table-column label="分区作品数" prop="paArticleCount"/>
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible2" title="编辑分区">
      <el-form :model="form" label-width="80px">
        <el-form-item label="分区名称">
          <el-input v-model="form.paName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit();">确 定</el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisible" title="新增分区">
      <el-form :model="form" label-width="80px">
        <el-form-item label="分区名称">
          <el-input v-model="form.paName"></el-input>
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