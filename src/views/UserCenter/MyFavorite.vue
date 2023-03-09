<template>
  <el-table
      :data="favoriteStore.favoriteList"
      border
      style="width: 100%"
      height="400">
    <el-table-column prop="faId" label="收藏编号"/>
    <el-table-column prop="arId" label="文章编号"/>
    <el-table-column prop="arTitle" label="文章标题"/>
    <el-table-column prop="faTime" label="收藏时间"/>
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <el-button size="small" :key="scope.row.arId" @click="delFev(scope.row.faId)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {useFavoriteStore} from "../../store/Favorite";
import axios from "axios";

const user = JSON.parse(sessionStorage.getItem('token') || '{}')
const noId = user.noId
const favoriteStore = useFavoriteStore()

axios.post('http://localhost:8088/noUser/queryFavorite', {
  noId: noId
}).then(res => {
  console.log(noId)
  console.log(res.data.noFavoritesList)
  favoriteStore.favoriteList = res.data.noFavoritesList
})
function delFev(faId : number) {
axios.post('http://localhost:8088/noUser/delFavoriteByFaId', {
    faId: faId
  }).then(res => {
    console.log(res.data)
    if (res.data.code === 500) {
      favoriteStore.favoriteList = favoriteStore.favoriteList.filter((item: any) => item.faId !== faId)
      location.reload()
    }
  })
}

</script>

<style scoped>

</style>