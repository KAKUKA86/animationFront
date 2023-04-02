<template>
  <el-card>
    <div><h2>文章审核页面</h2></div>
    <el-table
        :data="data"
        :row-class-name="tableRowClassName"
        height="400"
        style="width: 100%"
    >
      <el-table-column prop="arId" label="文章编号"/>
      <el-table-column prop="paId" label="分区">
        <template #default="{row}">
          {{ getPartitionName(row.paId) }}
        </template>
      </el-table-column>
      <el-table-column prop="arTitle" label="文章标题">
        <template #default="{row}">
          <el-link @click="goToArticle(row.arId)">{{row.arTitle }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="arTime" label="文章上传时间">
        <template #default="{row}">
          {{getTime(row.arTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="arReport" label="文章被举报次数"/>
      <el-table-column
          prop="arStatus"
          label="文章审核状态"
          width="200"
          :filters="[
            { text: '待审核', value: 0 },
            { text: '审核未通过', value: 1 },
            { text: '审核通过', value: 2 },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag v-if="scope.row.arStatus === 0" type="info">待审核</el-tag>
          <el-tag v-else-if="scope.row.arStatus === 1" type="warning">审核未通过</el-tag>
          <el-tag v-else-if="scope.row.arStatus === 2" type="success">审核通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              v-if="scope.row.arStatus === 0"
              type="primary"
              size="small"
              @click="handlePass(scope.row.arId)"
          >通过</el-button>
          <br>
          <el-button
              v-if="scope.row.arStatus === 0"
              type="danger"
              size="small"
              @click="handleNoPass(scope.row.arId)"
          >驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import {useArticleStore} from "../../store/Article";
import axios from "axios";
import {usePartitionStore} from "../../store/Partition";
import router from "../../router";

const partitionStore = usePartitionStore()
const articleStore = useArticleStore()
const auditor = JSON.parse(sessionStorage.getItem('token') || '{}')
const auId = auditor.auId
const filterTag = (value: number, row: { arStatus: number }) => {
  return row.arStatus === value
}
const data = articleStore.articleList
//所有文章查询
const url = 'http://localhost:8088/auUser/queArticle'
axios.post(url, {})
    .then(res => {
      articleStore.articleList = res.data.articleList
    })

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
//查询文章分区
axios.post('http://localhost:8088/adUser/quePartition', {}, {responseType: 'json'})
    .then(response => {
      partitionStore.partitionList = response.data.partitionList
      console.log(partitionStore.partitionList)
    }).catch(error => {
      console.log(error);
    }
)

axios.post(url, {}, {responseType: 'json'})
    .then(response => {
      console.log(response.data)
      articleStore.articleList =response.data.articleList
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
//审核文章操作
const handlePass = (arId: number) => {
  axios.post('http://localhost:8088/auUser/updAudArticle', {
    auId: auId,
    arId: arId,
    arStatus: 2
  }, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        articleStore.articleList =response.data.articleList
        console.log(typeof articleStore.articleList)
        location.reload()
      }).catch(error => {
        console.log(error);
      }
  )
}
const handleNoPass = (arId: number) =>{
  axios.post('http://localhost:8088/auUser/updAudArticle', {
    auId: auId,
    arId: arId,
    arStatus: 1
  }, {responseType: 'json'})
      .then(response => {
        console.log(response.data)
        articleStore.articleList =response.data.articleList
        console.log(typeof articleStore.articleList)
        location.reload()
      }).catch(error => {
        console.log(error);
      }
  )
}
//跳转文章详情
const goToArticle = (arId: number) => {
  console.log("打印"+arId)
  router.push({name:'audiArticleDetail', query:{arId:arId}})
}
function getTime (time: any) {
  const date = new Date(time)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}
</script>

<style scoped>

</style>