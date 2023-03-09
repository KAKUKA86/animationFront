<template>
  <el-table
      :data="commentStore.commentList"
      style="width: 100%"
      height="400"
  >
    <el-table-column prop="coId" label="评论编号"/>
    <el-table-column prop="arId" label="文章编号"/>
    <el-table-column prop="coContent" label="评论内容"/>
    <el-table-column prop="coTime" label="评论时间"/>
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <el-button size="small" :key="scope.row.coId" @click="editComment(scope.row.coId)">编辑</el-button>
        <br>
        <el-button size="small" :key="scope.row.coId" @click="delComment(scope.row.coId)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script lang="ts" setup>
import axios from "axios";
import {useCommentStore} from "../../store/Comment";
import router from "../../router";

const user = JSON.parse(sessionStorage.getItem('token') || '{}')
const noId = user.noId
const commentStore = useCommentStore()

axios.post('http://localhost:8088/noUser/queCom', {
  noId: noId
}).then(res => {
  console.log(res.data.commentList)
  commentStore.commentList = res.data.commentList
})
const editComment = (coId: number) => {
  console.log(coId)
  router.push({
    name: 'editComment',
    query: {
      coId: coId
    }
  })
}
function delComment(coId: number) {
  axios.post('http://localhost:8088/noUser/delCom', {
    coId: coId
  }).then(res => {
    console.log(res.data)
    if (res.data.code === 500) {
      commentStore.commentList = commentStore.commentList.filter((item: any) => item.coId !== coId)
      location.reload()
    }
  })
}
</script>

<style scoped>

</style>