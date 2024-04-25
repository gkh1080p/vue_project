<template>
  <div class="travel">
    <div class="top">
      <p class="title">实时用户统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>{{people}}</span>人</p>
    </div>
    <div class="number">
      <span v-for="item in people">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup name="tourist">
import {ref,onMounted} from "vue"
import * as echarts from 'echarts';
// 水球图
import 'echarts-liquidfill'
let people=ref("21234")
let charts=ref()
// 程序挂在完毕
onMounted(()=>{
  // 获取chart中dom元素
  let mycharts=echarts.init(charts.value)
  // 设置是的配置项
  mycharts.setOption({
    // x|y轴组件
    xAxis:{},
    yAxis:{},
    // 系列：决定你展示什么样式的图形图标
    series:{
      type:'liquidFill',
      data:[0.6,0.5,0.4,0.3],
      color: ['#8A2BE2', '#483D8B', '#6A5ACD', '#7B68EE'],
      waveAnimation: true,
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius:'90%',
      center: ['50%', '50%'],
      direction: 'right',
    },
    // 布局组件
    grid:{
      left:0,
      top:0,
      bottom:0,
      right:0,
    }
  })
})
</script>

<style lang="scss" scoped>
.travel {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 50px;

  // margin-right: 100px;
  .top {
    .title {
      margin-top: 10px;
      color: #fff;
      font-size: 25px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png);
      background-size: 100% 100%;
      margin-top: 15px;
    }

    .right {
      color: #fff;
      float: right;
      margin-right: 30px;
      font-size: 22px;
      span {
        color: yellowgreen
      }
    }
  }
  .number{
    margin-top:45px;
    display: flex;
    padding:0 10px;
    span{
      background: url(../../images/total.png);
      background-size: 100% 100%;
      flex:1;
      height: 60px;
      text-align: center;
      line-height: 60px;
      color: #29fcff;
      font-size: 30px;
    }
  }
  .charts{
    width: 100%;
    height: 230px;
  }
}
</style>