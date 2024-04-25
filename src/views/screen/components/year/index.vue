<template>
    <div class="year">
        <div class="title">
            <p>年度游客对比</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts">
        </div>
    </div>
</template>

<script setup name="Year">
import * as echarts from 'echarts'
import {ref ,onMounted} from 'vue'
let charts=ref()
onMounted(()=>{
    let year=echarts.init(charts.value)
    
    let option = {
	"grid": {
		"containLabel": true,
		"bottom": "50",
		"top": "50",
		"left": "50",
		"right": "50"
	},
	"xAxis": {
		"triggerEvent": true,
		"axisLabel": {
			"show": true,
			"fontSize": 12,
			"color": "#fff",
			"align": "center",
			"verticalAlign": "top"
		},
		"axisLine": {
			"show": false
		},
		"axisTick": {
			"show": true,
			"lineStyle": {
				"show": true,
				"color": "#0B3561",
				"width": 2
			}
		},
		"data": ["4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月", "3月"]
	},
	"yAxis": [{
		"axisLabel": {
			"interval": 0,
			"show": true,
			"fontSize": 14,
			"color": "#fff"
		},
		"axisLine": {
			"show": false
		},
		"axisTick": {
			"show": false
		},
		"splitLine": {
			"lineStyle": {
				"type": "dashed",
				"color": "rgba(255,255,255,0.15)"
			}
		}
	}],
	"series": [{
		
		"type": "line",
		"smooth": false,
		"symbol": "circle",
		"symbolSize": 3,
		"showSymbol": false,
		"lineStyle": {
			"normal": {
				"width": 2,
				"shadowColor": "#159AFF",
				"shadowBlur": 8
			}
		},
		"itemStyle": {
			"normal": {
				"color": "#159AFF"
			}
		},
		"data": [11, 12, 13, 14, 17, 11, 10, 20, 12, 10, 10, 10]
	}, {
		
		"type": "line",
		"smooth": false,
		"symbol": "circle",
		"symbolSize": 3,
		"showSymbol": false,
		"lineStyle": {
			"normal": {
				"width": 2,
				"shadowColor": "#5EFF5A",
				"shadowBlur": 8
			}
		},
		"itemStyle": {
			"normal": {
				"color": "#5EFF5A"
			}
		},
		"data": [21, 22, 22, 24, 22, 29, 20, 23, 23, 22, 22, 22]
	}, {
		"name": "因劳动报酬、工伤医疗费、经济补偿或者赔偿金等发生的争议",
		"type": "line",
		"smooth": false,
		"symbol": "circle",
		"symbolSize": 3,
		"showSymbol": false,
		"lineStyle": {
			"normal": {
				"width": 2,
				"shadowColor": "#FF7734",
				"shadowBlur": 8
			}
		},
		"itemStyle": {
			"normal": {
				"color": "#FF7734"
			}
		},
		"data": [31, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
	}, {
		"name": "因确认劳动关系发生的争议",
		"type": "line",
		"smooth": false,
		"symbol": "circle",
		"symbolSize": 3,
		"showSymbol": false,
		"lineStyle": {
			"normal": {
				"width": 2,
				"shadowColor": "#15F6EE",
				"shadowBlur": 8
			}
		},
		"itemStyle": {
			"normal": {
				"color": "#15F6EE"
			}
		},
		"data": [41, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
	}, {
		"name": "因工作时间、休息休假、社会保险、福利、培训以及劳动保护发生的争议",
		"type": "line",
		"smooth": false,
		"symbol": "circle",
		"symbolSize": 3,
		"showSymbol": false,
		"lineStyle": {
			"normal": {
				"width": 2,
				"shadowColor": "#F5E74F",
				"shadowBlur": 8
			}
		},
		"itemStyle": {
			"normal": {
				"color": "#F5E74F"
			}
		},
		"data": [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
	}, {
		"name": "法律、法规规定的其他劳动争议",
		"type": "line",
		"smooth": false,
		"symbol": "circle",
		"symbolSize": 3,
		"showSymbol": false,
		"lineStyle": {
			"normal": {
				"width": 2,
				"shadowColor": "#FF386B",
				"shadowBlur": 8
			}
		},
		"itemStyle": {
			"normal": {
				"color": "#FF386B"
			}
		},
		"data": [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
	}, {
		"name": "flow_因订立、履行、变更、解除和终止劳动合同发生的争议",
		"type": "lines",
		"polyline": true,
		"showSymbol": false,
		"coordinateSystem": "cartesian2d",
		"effect": {
			"trailLength": 0.3,
			"show": true,
			"period": 6,
			"symbolSize": 4,
			"loop": true
		},
		"lineStyle": {
			"color": "#fff",
			"width": 0,
			"opacity": 0,
			"curveness": 0,
			"type": "dashed"
		},
		"data": [{
			"coords": [
				["4月", 11],
				["5月", 12],
				["6月", 10],
				["7月", 10],
				["8月", 10],
				["9月", 10],
				["10月", 10],
				["11月", 10],
				["12月", 10],
				["1月", 10],
				["2月", 10],
				["3月", 10]
			]
		}]
	}, {
		"name": "flow_因除名、辞退和辞职、离职发生的争议",
		"type": "lines",
		"polyline": true,
		"showSymbol": false,
		"coordinateSystem": "cartesian2d",
		"effect": {
			"trailLength": 0.3,
			"show": true,
			"period": 6,
			"symbolSize": 4,
			"loop": true
		},
		"lineStyle": {
			"color": "#fff",
			"width": 0,
			"opacity": 0,
			"curveness": 0,
			"type": "dashed"
		},
		"data": [{
			"coords": [
				["4月", 21],
				["5月", 22],
				["6月", 20],
				["7月", 20],
				["8月", 20],
				["9月", 20],
				["10月", 20],
				["11月", 20],
				["12月", 20],
				["1月", 20],
				["2月", 20],
				["3月", 20]
			]
		}]
	}, {
		"name": "flow_因劳动报酬、工伤医疗费、经济补偿或者赔偿金等发生的争议",
		"type": "lines",
		"polyline": true,
		"showSymbol": false,
		"coordinateSystem": "cartesian2d",
		"effect": {
			"trailLength": 0.3,
			"show": true,
			"period": 6,
			"symbolSize": 4,
			"loop": true
		},
		"lineStyle": {
			"color": "#fff",
			"width": 0,
			"opacity": 0,
			"curveness": 0,
			"type": "dashed"
		},
		"data": [{
			"coords": [
				["4月", 31],
				["5月", 30],
				["6月", 30],
				["7月", 30],
				["8月", 30],
				["9月", 30],
				["10月", 30],
				["11月", 30],
				["12月", 30],
				["1月", 30],
				["2月", 30],
				["3月", 30]
			]
		}]
	}, {
		"name": "flow_因确认劳动关系发生的争议",
		"type": "lines",
		"polyline": true,
		"showSymbol": false,
		"coordinateSystem": "cartesian2d",
		"effect": {
			"trailLength": 0.3,
			"show": true,
			"period": 6,
			"symbolSize": 4,
			"loop": true
		},
		"lineStyle": {
			"color": "#fff",
			"width": 0,
			"opacity": 0,
			"curveness": 0,
			"type": "dashed"
		},
		"data": [{
			"coords": [
				["4月", 41],
				["5月", 40],
				["6月", 40],
				["7月", 40],
				["8月", 40],
				["9月", 40],
				["10月", 40],
				["11月", 40],
				["12月", 40],
				["1月", 40],
				["2月", 40],
				["3月", 40]
			]
		}]
	}, {
		"name": "flow_因工作时间、休息休假、社会保险、福利、培训以及劳动保护发生的争议",
		"type": "lines",
		"polyline": true,
		"showSymbol": false,
		"coordinateSystem": "cartesian2d",
		"effect": {
			"trailLength": 0.3,
			"show": true,
			"period": 6,
			"symbolSize": 4,
			"loop": true
		},
		"lineStyle": {
			"color": "#fff",
			"width": 0,
			"opacity": 0,
			"curveness": 0,
			"type": "dashed"
		},
		"data": [{
			"coords": [
				["4月", 50],
				["5月", 50],
				["6月", 50],
				["7月", 50],
				["8月", 50],
				["9月", 50],
				["10月", 50],
				["11月", 50],
				["12月", 50],
				["1月", 50],
				["2月", 50],
				["3月", 50]
			]
		}]
	}, {
		"name": "flow_法律、法规规定的其他劳动争议",
		"type": "lines",
		"polyline": true,
		"showSymbol": false,
		"coordinateSystem": "cartesian2d",
		"effect": {
			"trailLength": 0.3,
			"show": true,
			"period": 6,
			"symbolSize": 4,
			"loop": true
		},
		"lineStyle": {
			"color": "#fff",
			"width": 0,
			"opacity": 0,
			"curveness": 0,
			"type": "dashed"
		},
		"data": [{
			"coords": [
				["4月", 60],
				["5月", 60],
				["6月", 60],
				["7月", 60],
				["8月", 60],
				["9月", 60],
				["10月", 60],
				["11月", 60],
				["12月", 60],
				["1月", 60],
				["2月", 60],
				["3月", 60]
			]
		}]
	}]
}
    year.setOption(option)
})
</script>

<style lang="scss" scoped>
.year {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    color: white;
    margin-left: 30px;
    margin-top: 20px;

    .title {
        margin-top:10px;
        p {
            font-size: 22px;
        }
    }
    .charts{
        height: calc(100% - 30px);
    }

}
</style>