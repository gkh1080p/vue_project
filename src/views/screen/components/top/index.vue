<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script setup name="top">
// 点击首页按钮回到首页
import {ref,onMounted,onBeforeUnmount} from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment'
let $router=useRouter()
// 存储当前时间
let time=ref(moment().format('YYYY-MM-DD/hh:mm:ss'))
let timer=ref(0)
const goHome=()=>{
  $router.push('./home')
}
// 组件挂载完毕
onMounted(()=>{
  timer.value= setInterval(()=>{
    time.value=moment().format('YYYY-MM-DD/hh:mm:ss')
  },1000)
})
// 组件销毁
onBeforeUnmount(()=>{
  clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
  .top{
    color:#29fcff;
    width: 100%;
    height: 40px;
    display: flex;
    .left{
      flex: 1;
      background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
      .lbtn{
        width: 150px;
        height: 40px;
        float:right;
        background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 40px;
        font-size: 25px;
        cursor: pointer;
      }
    }
    .center{
      flex: 3;
      .title{
        width: 100%;
        height: 74px;
        background:url(../../images/dataScreen-header-center-bg.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 74px;
        font-size: 30px;
      }
    }
    .right{
      flex: 1;
      .rbtn{
        width: 150px;
        height: 40px;
        float:left;
        background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 40px;
        font-size: 25px;
        
      }
      .time{
        float: right;
        width: 220px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 15px;
      }
    }
  }
</style>