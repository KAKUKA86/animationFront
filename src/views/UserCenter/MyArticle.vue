<template>
  <!--查询我的文章-->
  <el-table
      :data="articleStore.articleList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      height="400"
  >
    <el-table-column prop="arId" label="文章编号"/>
    <el-table-column prop="paId" label="分区">
      <template #default="{row}">
        {{ getPartitionName(row.paId) }}
      </template>
    </el-table-column>
    <el-table-column prop="arTitle" label="文章标题"/>
    <el-table-column prop="arTime" label="文章上传时间">
      <template #default="{row}">
        {{ setTime(row.arTime) }}
      </template>
    </el-table-column>
    <el-table-column prop="arStatus" label="文章审核状态">
      <template #default="scope">
        <el-tag v-if="scope.row.arStatus === 0" type="info">待审核</el-tag>
        <el-tag v-else-if="scope.row.arStatus === 1" type="warning">审核未通过</el-tag>
        <el-tag v-else-if="scope.row.arStatus === 2" type="success">审核通过</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <el-button size="small" :key="scope.row.arId" @click="editArticle(scope.row.arId)">编辑</el-button>
        <br>
        <el-button size="small" :key="scope.row.arId" @click="delArticle(scope.row.arId)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import axios from "axios";
import {useArticleStore} from "../../store/Article";
import {usePartitionStore} from "../../store/Partition";
import router from "../../router";
import {ElMessage} from "element-plus";

const user = JSON.parse(sessionStorage.getItem('token') || '{}')
const noId = user.noId
const url = 'http://localhost:8088/noUser/queArt'
const articleStore = useArticleStore()
const partitionStore = usePartitionStore()

interface article {
  arStatus: number
}

const tableRowClassName = ({
                             row
                           }: {
  row: article
}) => {
  if (row.arStatus === 1) {
    return 'warning-row'
  } else if (row.arStatus === 2) {
    return 'success-row'
  }
  return ''
}
axios.post('http://localhost:8088/noUser/queArtPart', {}, {responseType: 'json'})
    .then(response => {
      partitionStore.partitionList = response.data.data
      console.log(partitionStore.partitionList)
    }).catch(error => {
      console.log(error);
    }
)

axios.post(url, {noId: noId}, {responseType: 'json'})
    .then(response => {
      console.log(response.data)
      articleStore.articleList = response.data.articleList
    }).catch(error => {
      console.log(error);
    }
)
const getPartitionName = (paId: number) => {
  for (let i = 0; i < partitionStore.partitionList.length; i++) {
    if (partitionStore.partitionList[i].paId === paId) {
      return partitionStore.partitionList[i].paName
    }
  }
}

const editArticle = (arId: number) => {
  console.log("编辑帖子" + arId)
  router.push({name: 'editArticle', query: {arId: arId}})
}

function delArticle(arId: number) {
  console.log("删除帖子" + arId)
  axios.post('http://localhost:8088/noUser/delArt', {noId: noId, arId: arId}, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        if (response.data.code === 200) {
          ElMessage.success('删除成功')
          console.log("删除成功")
          location.reload()
        }
      }).catch(error => {
        console.log(error);
      }
  )
}
function setTime(time: any) {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}
</script>


<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
