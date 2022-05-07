<template>
  <div class="base-echart">
    <div id="chart_example"></div>
    {{ enlarge }}
    <div
      :class="{ fullChart: true, fullActive: enlarge }"
      ref="fullChart"
    ></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'baseEchart',
  components: {},
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { enlarge: false, myChart: null }
  },
  mounted() {
    this.initEchart()
  },
  methods: {
    initEchart() {
      this.myChart = echarts.init(document.getElementById('chart_example'))
      this.myChart.setOption({
        title: {
          text: this.config.showText,
        },
        color: ['#f44'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        toolbox: {
          right: 25,
          top: 5,
          feature: {
            myFull: {
              show: true,
              title: '全屏查看',
              icon:
                'path://M161.568 188.352l0 0.16 0 202.912c0 15.52 12.608 28.096 28.096 28.096s28.096-12.608 28.096-28.096l0-130.88 162.656 178.944c10.432 11.52 28.096 12.288 39.616 1.856 11.52-10.432 12.288-28.096 1.856-39.616L252.48 215.552l140.704 0c15.52 0 28.096-12.608 28.096-28.096s-12.608-28.096-28.096-28.096L190.272 159.36c-6.912 0-13.376 2.464-18.112 6.752C171.712 166.4 171.232 166.848 170.784 167.328 164.64 172.864 161.568 180.672 161.568 188.352L161.568 188.352 161.568 188.352z' +
                'M862.432 188.352l0 0.16 0 202.912c0 15.52-12.608 28.096-28.096 28.096-15.52 0-28.096-12.608-28.096-28.096l0-130.88-162.656 179.104c-10.432 11.52-28.096 12.288-39.616 1.856-11.52-10.432-12.288-28.096-1.856-39.616l169.408-186.304-140.704 0c-15.52 0-28.096-12.608-28.096-28.096s12.608-28.096 28.096-28.096l202.912 0c6.912 0 13.376 2.464 18.112 6.752 0.448 0.32 0.928 0.768 1.376 1.216C859.36 172.864 862.432 180.672 862.432 188.352L862.432 188.352 862.432 188.352z' +
                'M161.568 835.488l0-0.16 0-202.912c0-15.52 12.608-28.096 28.096-28.096s28.096 12.608 28.096 28.096l0 130.88 162.656-178.944c10.432-11.52 28.096-12.288 39.616-1.856 11.52 10.432 12.288 28.096 1.856 39.616L252.48 808.288l140.704 0c15.52 0 28.096 12.608 28.096 28.096s-12.608 28.096-28.096 28.096L190.272 864.48c-6.912 0-13.376-2.464-18.112-6.752-0.448-0.32-0.928-0.768-1.376-1.216C164.64 851.008 161.568 843.328 161.568 835.488L161.568 835.488 161.568 835.488z' +
                'M862.432 835.488l0-0.16 0-202.912c0-15.52-12.608-28.096-28.096-28.096-15.52 0-28.096 12.608-28.096 28.096l0 130.88-162.656-178.944c-10.432-11.52-28.096-12.288-39.616-1.856-11.52 10.432-12.288 28.096-1.856 39.616l169.408 186.304-140.704 0c-15.52 0-28.096 12.608-28.096 28.096s12.608 28.096 28.096 28.096l202.912 0c6.912 0 13.376-2.464 18.112-6.752 0.448-0.32 0.928-0.768 1.376-1.216C859.36 851.008 862.432 843.328 862.432 835.488L862.432 835.488 862.432 835.488z',
              onclick: (e) => {
                let opts = e.getOption()
                // opts.toolbox[0].feature.myFull.show = false
                console.log('opts.toolbox[0] :>> ', opts.toolbox[0])
                this.enlarge = !this.enlarge
                this.$nextTick(() => {
                  let fullchart = echarts.init(this.$refs.fullChart)
                  fullchart.setOption(opts)
                })
              },
              iconStyle: {
                color: '##0780ED',
              },
            },
          },
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.xlist,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              formatter: function (val) {
                console.log('val :>> ', val)
                return val + '❤'
              },
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
            data: this.chartData.ylist,
          },
        ],
      })
    },
  },
  watch: {
    chartData: {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.initEchart()
      },
    },
  },
}
</script>

<style scoped lang="less">
.base-echart {
  height: 100%;
  width: 100%;
  overflow: hidden;
  flex: 1;
  box-sizing: border-box;
  height: 500px;
  #chart_example {
    width: 50%;
    height: 500px;
  }

  .fullChart {
    background-color: antiquewhite;
    display: none;
    padding-left: 59px;
    padding-right: 10px;
    width: 100vh;
    height: 100vw;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(90deg);
    background: #fff;
    position: fixed !important;
    z-index: 1001;
    box-sizing: border-box;
  }
  .fullActive {
    display: block;
  }
}
</style>