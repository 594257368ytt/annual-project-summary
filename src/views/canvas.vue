<template>
  <div class="box">
    <canvas id="analysis-canvas">您当前的版本不支持</canvas>
  </div>
</template>

<script>
let canvas
let ctx
export default {
  name: 'box',

  data() {
    return {}
  },
  mounted() {
    this.initCanvas()
  },
  created() {},
  methods: {
    initCanvas() {
      canvas = document.getElementById('analysis-canvas')
      let box = document.getElementById('box')
      ctx = canvas.getContext('2d')
      canvas.width = 1200
      canvas.height = 500
      canvas.style.backgroundColor = '#ffcccc'
      // this.drawLineCanvas()
      // this.drawArcCanvas()
      this.drawUnfilledRectangle()
      this.drawFilledRectangle()
      this.drawRect()
      this.quadraticCurve()
      this.bezierCurve()
    },
    angleToRadian(angle) {
      return (Math.PI / 180) * angle
    },
    // 绘制直线
    drawLineCanvas() {
      // 设置线条的颜色
      ctx.strokeStyle = '#000'
      // 设置线条的宽度
      ctx.lineWidth = 5
      // 绘制直线
      ctx.beginPath()
      // 起点
      ctx.moveTo(200, 200)
      // 终点
      ctx.lineTo(500, 200)
      ctx.closePath()
      ctx.stroke()
    },
    // 绘制圆/扇形
    drawArcCanvas() {
      ctx.beginPath()
      /*
       * params
       * 圆心x坐标
       * 圆心y坐标
       * 半径
       * 起始角度
       * 结束角度
       * 方向，true 逆时针   false 顺时针  默认false，不写表示false
       */
      //顺时针封口扇形
      ctx.arc(200, 200, 100, 0, Math.PI / 2, false)
      ctx.strokeStyle = 'red'
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      //逆时针不封口扇形
      ctx.arc(100, 100, 50, this.angleToRadian(0), this.angleToRadian(90), true)
      ctx.strokeStyle = 'deepskyblue'
      ctx.stroke()
    },
    // 用四条直线绘制无填充矩形
    drawUnfilledRectangle() {
      ctx.strokeStyle = '#00'
      ctx.fillStyle = '#e6c7ff'
      ctx.lineWidth = 2 // 设置线段宽度
      ctx.beginPath() // 开始点
      ctx.moveTo(30, 30)
      ctx.lineTo(230, 30)
      ctx.lineTo(230, 200)
      ctx.lineTo(30, 200)
      ctx.lineTo(30, 30)
      // ctx.closePath()
      ctx.stroke() // 进行绘制外边框
    },
    // 用四条直线绘制填充矩形
    drawFilledRectangle() {
      ctx.beginPath()
      ctx.moveTo(300, 30)
      ctx.lineTo(500, 30)
      ctx.lineTo(500, 200)
      ctx.lineTo(300, 200)
      ctx.lineTo(300, 30)
      ctx.fill() // 进行内容填充
      ctx.stroke() // 进行绘制外边框
    },
    drawRect() {
      ctx.strokeStyle = '#00'
      ctx.fillStyle = '#9f9'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.rect(550, 30, 200, 150)
      ctx.stroke()

      ctx.beginPath()
      ctx.rect(800, 30, 200, 150)
      ctx.stroke()
      ctx.fill()
    },
    // 贝塞尔曲线
    quadraticCurve() {
      ctx.moveTo(200, 400)
      ctx.quadraticCurveTo(300, 300, 400, 400)
      ctx.stroke()
    },
    bezierCurve() {
      ctx.strokeStyle = '#FA7E2A'
      ctx.beginPath()
      ctx.moveTo(455, 375)
      ctx.bezierCurveTo(430, 80, 650, 550, 650, 350)
      ctx.stroke()
    },
  },
}
</script>
<style scoped lang="less">
.box {
  height: 100%;
  width: 100%;
}
</style>
