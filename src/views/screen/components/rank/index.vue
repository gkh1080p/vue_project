<template>
    <div class="rank">
        <div class="title">
            <p>热门景区排行</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup name="Rank">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let charts = ref()

onMounted(() => {
    let rank = echarts.init(charts.value)

    // 配置项
    var xData2 = [
        "餐饮区",
        "山路区",
        "风景区",
        "休息区",
        "儿童区",
    ];
    var data1 = [200, 100, 200, 200, 100];
    var data2 = [300, 400, 300, 300, 400];
    var data3 = [500, 500, 500, 500, 500];

    let barTopColor = [
        "#149575",
        "#AE790C",
        "#0E86B1",
        "#4572BA",
        "#30B1AE",
        "#53e568",
        "#02c3f1",
        "#53e568",
    ];
    let barBottomColor = [
        "#33C09D",
        "#F8B82F",
        "#3ED0F2",
        "#74A7F5",
        "#74F4E7",
        "#53e568",
        "#02c3f1",
        "#53e568",
    ];
    let option = {
        backgroundColor: "#000",
        tooltip: {
            trigger: "item",
        },
        grid: {
            left: 40,
            bottom: 30,
            top: 10,
            right: 10,
        },
        xAxis: {
            data: xData2,
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                interval: 0,
                color: '#fff',
                fontSize: 12,
                margin: 10, //刻度标签与轴线之间的距离。
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
            },
        },
        series: [
            {
                //三个最低下的圆片
                name: "",
                type: "pictorialBar",
                symbolSize: [30, 10],
                symbolOffset: [0, 6],
                z: 20,
                itemStyle: {
                    opacity: 1,
                    color: function (params) {
                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: barTopColor[params.dataIndex],
                            },
                            {
                                offset: 0,
                                color: barBottomColor[params.dataIndex],
                            },
                        ]);
                    },
                },
                data: [1, 1, 1, 1, 1],
            },

            //下半截柱状图
            {
                name: "2020",
                type: "bar",
                barWidth: 30,
                barGap: "-100%",
                itemStyle: {
                    //lenged文本
                    opacity: 0.9,
                    color: function (params) {
                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: barTopColor[params.dataIndex],
                            },
                            {
                                offset: 1,
                                color: barBottomColor[params.dataIndex],
                            },
                        ]);
                    },
                },
                label: {
                    show: true,
                    position: "top",
                    fontSize: 14,
                    color: "#fff", //柱状顶部文字颜色
                    formatter: function (params) {
                        // return '20%';
                    },
                },
                data: data1,
            },

            {
                // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
                type: "bar",
                barWidth: 30,
                barGap: "-100%",
                stack: "广告",
                itemStyle: {
                    color: "transparent",
                },
                data: data1,
            },

            {
                name: "", //头部
                type: "pictorialBar",
                symbolSize: [30, 10],
                symbolOffset: [0, -6],
                z: 12,
                symbolPosition: "end",
                itemStyle: {
                    color: function (params) {
                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: barTopColor[params.dataIndex],
                            },
                            {
                                offset: 0,
                                color: barBottomColor[params.dataIndex],
                            },
                        ]);
                    },
                    opacity: 0.8,
                },
                data: data3,
            },

            {
                name: "",
                type: "pictorialBar",
                symbolSize: [30, 10],
                symbolOffset: [0, -6],
                z: 12,
                itemStyle: {
                    opacity: 1,
                    color: function (params) {
                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: barTopColor[params.dataIndex],
                            },
                            {
                                offset: 0,
                                color: barBottomColor[params.dataIndex],
                            },
                        ]);
                    },
                },
                symbolPosition: "end",
                data: data1,
            },

            {
                name: "满意程度",
                stack: "a",
                type: "bar",
                barWidth: 30,
                z: 2,
                barGap: "-100%",
                stack: "广告",
                data: data2,
                itemStyle: {
                    color: function (params) {
                        return barTopColor[params.dataIndex];
                    },
                    opacity: 0.5,
                },
            },
        ],
    };

    // 导入
    rank.setOption(option)
})

</script>

<style lang="scss" scoped>
.rank {
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    color: white;
    margin-left: 30px;
    margin-top: 20px;

    .title {
        margin-top: 20px;
        margin-left: 5px;
    }

    .charts {
        height: calc(100% - 30px);

    }
}
</style>