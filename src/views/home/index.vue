<template>
  <div>
   我是home页面
  </div>
</template>

<script setup lang="ts">
// 引入组合式api函数之生命函数
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
// 获取仓库对象
let userStore=useUserStore();
onMounted(()=>{
  userStore.userInfo()
})
</script>

<style lang="css" scoped>

</style>