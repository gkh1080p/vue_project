<template>
  <el-card>
    <el-row :gutter="20" style="margin: 10px  10px 35px 10px;">
    <el-col :span="6">
      <img :src="userStore.avatar" alt="" style="width: 70%; height: 120%;border-radius: 60%">
    </el-col>
    <el-col :span="18">
      <div class="value">{{ getTime() }}好呀！{{ userStore.username }}</div>
      <div class="value2">后台管理系统</div>
    </el-col>
  </el-row>
  </el-card>
  <svgTemp></svgTemp>
</template>

<script setup lang="ts">
// @ts-nocheck
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';
import svgTemp from "./svg.vue"
let userStore=useUserStore()
</script>

<style lang="scss" scoped>
.value{
  margin-top: 5%;
  font-size: 400%;
}
.value2{
  margin-top: 2%;
  margin-left: 2%;
  font-size: 150%;
  color:rgba(151, 151, 147, 0.922)
}
 .svgClass{
  margin:0px,auto;
 }

</style>