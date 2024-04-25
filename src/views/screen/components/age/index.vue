<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup name="Age">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let charts = ref()
// 组件初始化
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  let option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: '统计结果',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                {value: 305, name: '0—14岁'},
                {value: 410, name: '15-35岁'},
                {value: 380, name: '35-60岁'},
                {value: 204, name: '60岁及以上'},
                {value: 105, name: '65岁及以上'},
               
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                color: '#fff',
                fontSize:20
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#4ab97c',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ],
    grid:{
      left:0,
      top:0,
      right:0,
      bottom:0,
    }

  }
  mycharts.setOption(option)
})
</script>

<style lang="scss" scoped>
.box2 {
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  color: white;

  .title {
    p {

      font-size: 22px;
    }
  }

  .charts {
    // padding-top:10px;
    height: 100%;
  }
}
</style>