<template>
  <el-table
      :data="favoriteStore.favoriteList"
      border
      style="width: 100%"
      height="250">
    <el-table-column prop="faId" label="收藏编号"/>
    <el-table-column prop="arId" label="文章编号"/>
    <el-table-column prop="arTitle" label="文章标题"/>
    <el-table-column prop="faTime" label="收藏时间"/>
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


</script>

<style scoped>

</style>