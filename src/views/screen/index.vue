<template>
 <div class="container">
    <!-- 内容展示区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <TopVue></TopVue>
      </div>
      <div class="bottom">
        <div class="left">
          <LeftTourist class="tourist"></LeftTourist>
          <LeftSex class="sex"></LeftSex>
          <LeftAge class="age"></LeftAge>
        </div>
        <div class="center">
          <CenterMap class="map"></CenterMap>
          <CenterLine class="line"></CenterLine>
        </div>
        <div class="right">
          <RightRank class="rank"></RightRank>
          <RightYear class="year"></RightYear>
          <RightCouter class="couter"></RightCouter>
        </div>
      </div>
    </div>
 </div>
</template>

<script setup lang="ts" name="screen">
// 引入组件
import TopVue from './components/top/index.vue'
// 引入左侧三个组件
import LeftTourist from './components/tourist/index.vue'
import LeftAge from './components/age/index.vue'
import LeftSex from './components/sex/index.vue'
// 引入中间两个
import CenterMap from './components/map/index.vue'
import CenterLine from './components/line/index.vue'
// 引入右侧三个部分
import RightRank from './components/rank/index.vue'
import RightCouter from './components/couter/index.vue'
import RightYear from './components/year/index.vue'
import {ref,onMounted } from 'vue'
// 获取数据大屏展示内容盒子的DOM元素
let screen=ref()
onMounted(() => {
  screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`
});
// 监听视口的变化
window.onresize=()=>{
  screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`
}
// 定义大屏缩放的比例
function getScale(w=1920,h=1080){
  let ww=window.innerWidth/w
  let wh=window.innerHeight/h
  return  ww<wh?ww:wh
}
</script>

<style lang="scss" scoped>
  .container{
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;
    .screen{
      position: fixed;
      width: 1920px;
      height: 1080px;
      // background: aqua;
      left: 50%;
      top:50%;
      transform-origin: left top;
      
      .bottom{
        display: flex;
        .right{
          flex:1;
          display:flex;
          flex-direction: column;
          .rank{
            flex:1;
          }
          .year{
            flex:1;
          }
          .couter{
            flex:1;
          }
        }
        .left{
          height: 1040px;
          flex:1;
          display: flex;
          flex-direction: column;
          .tourist{
            flex:1.5;
          }
          .age{
            flex:1;
          }
          .sex{
            flex:1;
          }
        }
        .center{
          flex:2;
          display: flex;
          flex-direction: column;
          .map{
            flex: 3;
          }
          .line{
            flex:1;
          }
        }
      }
    }
  }
</style>