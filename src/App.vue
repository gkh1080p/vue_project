<template>
  <div>
    <h1>测试axios的二次封装</h1>
  </div>
</template>

<script  setup lang="ts" >
  import request from '@/utils/request.ts'
  import {onMounted} from 'vue'
  onMounted(()=>{
    request({
      url:'/user/login',
      method:"post",
      data:{
        username:'admin',
        password:'111111'
      }
    }).then(res=>{
      console.log(res)
    })
  })
</script>

<style lang="" scoped>

</style>