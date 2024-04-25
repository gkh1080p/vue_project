<template>
  <div class="line">
    <div class="title">
      <p>未来7天游客数量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup name="Line">
import * as echarts from 'echarts';
import {ref,onMounted} from 'vue'
let charts=ref()
onMounted(()=>{
  let myCharts=echarts.init(charts.value)
  myCharts.setOption({
    title:{
      text:'访问量趋势图',
      color:"#dff3fb"
    },
    // x|y轴
    xAxis:{
      type:'category',
      boundaryGap:false,
      // 分割线不要
      splitLine:{
        show:false
      },
      data:['1号','2号','3号','4号','5号','6号','7号','8号','9号','10号','11号','12号','13号'],
      axisLine:{
        show:true
      },
      axisTick:{
        show:true
      }
    },
    yAxis:{
      splitLine:{
        show:false
      },
      axisLine:{
        show:true
      },
      axisTick:{
        show:true
      }
    },
    grid:{
      left:30,
      top:0,
      bottom:30,
      right:0,
    },
    series:[
      {
        type:'line',
        data:[50,120,233,102,342,100,234,234,123,234,341,111,231],
        smooth:true,
        // 区域填充样式
        areaStyle:{
          color:{
            type:'linear',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[{
              offset:0,color:'#7d69ec'
            },{
              offset:1,color:"#66ca93"
            }]
          }
        },

      }
    ]
    
  })
})
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin:0 20px;
  color: #fff;
  font-size: 20px;
  .title{
    margin-left: 10px;
  }
  .charts{
    height:calc(100% - 40px);
  }
}
</style>