<template>
  <div>
    <baseEchart :chartData="chartData" :config="config">111</baseEchart>
    <el-button @click="changeData">点我切换数据</el-button>
  </div>
</template>

<script>
import baseEchart from './components/baseEchart.vue'
export default {
  name: 'echartParent',
  components: { baseEchart },
  data() {
    return {
      chartData: {
        xlist: [
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
        ylist: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356],
      },
      config: {
        showText: '测试用图',
      },
    }
  },

  methods: {
    changeData() {
      this.chartData = {
        xlist: ['2018年', '2019年', '2021年', '2022年'],
        ylist: [100, 200, 100, 300],
      }
      // this.chartData.xlist = ['2018年', '2019年', '2021年', '2022年']
      // this.chartData.ylist = [100, 200, 100, 300]
    },
  },
}
</script>
<style scoped lang="less">
.echart-parent {
  height: 100%;
  width: 100%;
}
</style>
