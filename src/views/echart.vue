<template>
  <div class="echart">
    <div id="chart_example"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'echart',
  components: {},
  data() {
    return {
      option: {
        color: ['#f44'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月',
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '每月花费',
            type: 'bar',
            barWidth: '60%',
            data: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356],
          },
        ],
      },
    }
  },
  mounted() {
    this.initEchart()
  },
  methods: {
    initEchart() {
      let myChart = echarts.init(document.getElementById('chart_example'))
      myChart.setOption(this.option)
    },
  },
}
</script>
<style scoped lang="less">
.echart {
  height: 100%;
  width: 100%;
  #chart_example {
    width: 50%;
    height: 500px;
    border: 1px solid red;
    margin: 0 auto;
  }
}
</style>
