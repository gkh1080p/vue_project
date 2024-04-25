<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="">
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <p>男性58%</p>
      <p>女性42%</p>
    </div>
    <div class="chart" ref="charts">
    </div>
  </div>
</template>

<script setup name="sex">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue';
let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  // 配置项
  mycharts.setOption({
    title: {
      text: '男女比例',
      textStyle: {
        color: "skyblue"
      },
      left: '40%'
    },
    //x|y
    xAxis: {
      show: false,
      min:0,
      max:100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth:25,
        z:100,
        itemStyle:{
          color:'blur',
          borderRadius:10,
          borderColor:'aqua',
        }
      },
      {
        type: "bar",
        data: [100],
        barWidth:25,
        // 调整柱条的宽度
        barGap:'-100%',
        itemStyle:{
          color:'pink',
          borderRadius:10,
          borderColor:'aqua',
        }
      }
    ],
    grid: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,

    }
  })
})
</script>

<style lang="scss" scoped>
.box1 {
  color: #fff;
  font-size: 25px;
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

  .sex {
    display: flex;
    justify-content: center;

    img {
      margin: 20px;
    }

    .man {
      background: url(../../images/man-bg.png) no-repeat;
      width: 110px;
      height: 115px;
      justify-items: center;
      align-items: center;
    }

    .woman {
      background: url(../../images/woman-bg.png) no-repeat;
      width: 110px;
      height: 115px;
      justify-items: center;
      align-items: center;
    }
  }

  .rate {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    padding: 20px;

  }

  .chart {
    height: 100px;
    padding:0 30px;
    box-sizing: border-box;
  }
}
</style>