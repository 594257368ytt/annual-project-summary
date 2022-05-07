# 算法平台

## 组件构建

当一个项目多处用到表单、表格，样式也基本相同时，可以考虑抽取组件，一方面可以避免重复开发、代码冗余，另一方面也可以防止多人开发导致的样式有细微的出入。

但是构建的组件必须保证具有原子性，可复用性，可修改可自定义性，使用简单、可读性和易于维护性。

对前端同事构建的组件进行了学习和总结，并写了demo练习。

### 表单组件的难点

#### 辨别用户需要哪些元素

首先要知道用户需要几个元素，具体是什么元素。所以用户需要给组件传一个数组，该数组由对象组成，且对象中有字段type用于辨别元素类型。组件中写好el-form外框架，循环el-form-item，再判断el-form-item内部的元素具体是什么。

#### 插槽实现向组件插入自定义内容

子组建中使用<slot :name="`${item.slotName}`"></slot>标签，父组件使用 <template v-slot:slotNamePar>，传参slotName: 'slotNamePar'。

#### 注意表单元素有自带的插槽

例el-input有prefix、suffix、prepend、append，写进组件有利于拓展组件功能，增加可复用性。

#### 注意子组件给父组件传递函数

当遇到，子组件需要给父组件传递函数时，例如<el-upload>上传文件前需要自定义一些其他的操作，则需要父组件将函数传递给子组件，由于data中无法调用method函数，所以将子组件通过传参的方式获取父组件的函数，所以父组件将函数定义在参数中

```js
handleRemove: () => {
    console.log(1111)
},
```

#### 父组件demo：form.vue

```vue
<template>
  <div class="form">
    <baseForm :formProps="formProps">
      <template v-slot:slotNamePar
        >具名插槽添加任意内容
        <el-button type="primary">插入按钮</el-button>
        <br />
        <i class="el-icon-edit"> 插入图标</i>
      </template>
    </baseForm>
  </div>
</template>

<script>
import baseForm from './components/baseForm.vue'

export default {
  name: 'form',
  components: { baseForm },
  data() {
    return {
      formProps: [
        {
          label: 'input框',
          type: 'input',
        },
        { label: '单选框', type: 'radio', value: ['标签1', '标签2'] },
        { label: '文字标签', type: 'text', text: '文字内容' },
        { type: 'slot', label: 'slot', slotName: 'slotNamePar' },
        {
          label: '上传文件',
          type: 'upload',
          url: 'https://jsonplaceholder.typicode.com/posts/',
          fileList: [],
          handleRemove: () => {
            console.log(1111)
          },
          beforeUpload: () => {
            console.log(2222)
          },
        },
      ],
    }
  },
}
</script>
```

#### 子组件demo：baseForm.vue

```vue
<template>
  <div class="base-form">
    <el-form ref="form" :model="form" label-width="80px">
      <template v-for="(item, index) in formProps">
        <el-form-item v-if="item" :label="`${item.label}`" :key="index">
          <span v-if="item.type === 'text'">{{ item.text }}</span>
          <el-input v-model="form.name" v-if="item.type === 'input'"></el-input>
          <el-radio-group v-model="form.resource" v-if="item.type === 'radio'">
            <template v-for="(valueItem, valueIndex) in item.value">
              <el-radio :label="valueItem" :key="valueIndex"></el-radio>
            </template>
          </el-radio-group>
          <slot v-if="item.type === 'slot'" :name="`${item.slotName}`" />
          <el-upload
            v-if="item.type === 'upload'"
            class="upload-demo"
            :action="item.url"
            :before-upload="item.beforeUpload"
            :on-remove="item.handleRemove"
            multiple
            :limit="3"
            :file-list="item.fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'baseForm',
  props: {
    formProps: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    }
  },
}
</script>
```



# 微燃机

## 泛能画像：

### canvas使用

#### 页面定义

```html
<canvas id="analysis-canvas">您当前的版本不支持</canvas>
```

#### 初始化

```js
initCanvas() {
  canvas = document.getElementById('analysis-canvas')
  ctx = canvas.getContext('2d')
 
  canvas.width = 1000
  canvas.height = 500
  canvas.style.backgroundColor = '#ffcccc'
  this.drawLineCanvas()
},
```

这里要注意调用初始化函数要在mounted()中调用，否则无法获取到canva的dom元素。还有就是canvas以及ctx要定义全局变量，因为此处全局多个函数都要使用。

#### 绘制直线函数

```js
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
```

#### 绘制圆/扇形

```js
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
```

需要注意的是

1. ctx.closePath()会给绘制的曲线，起点和终点用直线连接，从而得到封闭图形，如果不想要封闭图形则不要加

2. ctx.stroke()是将刚刚的画笔所经过的路径绘制在页面的函数，如果不调用是不会显示在页面上的。

3. ctx.beginPath()是画笔落下开始绘制，如果想要绘制两个不相干的曲线就要加上这一句，如图1所示。如果想要绘制的效果是，前一个曲线的最后一个点，和当前曲线的起点相连接，就不要加上这句，这样前面的曲线和后面的曲线就是同一笔，就会连接起来且画笔粗细颜色等也是相同的，如图二。

   ![image-20220508052221209](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220508052221209.png)

![image-20220508052330443](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220508052330443.png)

#### 贝塞尔曲线

贝塞尔曲线由三点确定一条曲线，由moveTo(x0,y0)确定起点，quadraticCurveTo(x1,y1,x2,y2)，确定控制点和终点。起点和终点两点确定一条直线，控制点决定曲线哪个方向凸起，并决定曲线形状。

```js
quadraticCurve() {
  ctx.moveTo(200, 400)
  ctx.quadraticCurveTo(300, 300, 400, 400)
  ctx.stroke()
},
```

#### 绘制基础图形

其实通过直线和扇形组合已经可以完成大部分基础图形的绘制，如绘制矩形的函数可以通过组合起始点不同的直线绘制：

##### 用直线拼接无填充矩形

```js
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
```

值得注意的是最后一条直线可以不用绘制，使用ctx.closePath()语句可以直接封口。

##### 用直线拼接有填充矩形

```js
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
```

1. 这里的语句ctx.fill()，就是给矩形填充
2. ctx.fillStyle设置填充的颜色，strokeStyle设置的是画笔的颜色

对比如图：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22822169/1648022923616-cd150d58-015a-4172-8ae7-3c354a8fe712.png)

##### rect()绘制矩形

当然canvas中有绘制矩形自带的方法：rect(x, y, width, height)，参数是左上角坐标加上宽高。

```js
drawRect() {
  ctx.strokeStyle = '#00'
  ctx.fillStyle = '#9f9'
  ctx.lineWidth = 2
  // 绘制非填充矩形
  ctx.beginPath()
  ctx.rect(550, 30, 200, 150)
  ctx.stroke()
  // 绘制非填充矩形
  ctx.beginPath()
  ctx.rect(800, 30, 200, 200)
  ctx.fill()
},
```

如图：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22822169/1648022985640-82d38d65-a7d2-4407-b707-27db5d865d75.png)

##### fillRect() / strokeRect()

fillRect()绘制填充矩形和strokeRect()绘制边框矩形，参数和和rect()一样。

#### 三次方贝塞尔曲线

微燃机泛能画像项目中，需要展示不规则的图形如下：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22822169/1648023001375-a904c00e-aaa5-4fd4-9e7c-a8c385f4c446.png)

该图形拿到手，其实可以分成五部分，又红色边框框柱的四部分曲线，以及紫色部分框住的直线。第5部分全部由直线组成非常好处理，只要确定好位置即可。最难处理的是1、2、3、4部分，其实1、2、3、4部分是有规律的，左右两边图形左右翻转，上下图形镜面翻转。所以烤炉是否有函数图像能将其表示。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22822169/1648023032842-7ecbcb36-4621-4f12-a119-bd5e416b8352.png)

一开始考虑贝塞尔曲线的组合，但是需要两个贝塞尔曲线的拼接，而且很难保证拼接处重合，所以我又发现了一个三次贝塞尔曲线，具有两个控制点，可以调整出图片的样子。

同二次贝塞尔，moveTo(x0,y0)确定起点，ctx.bezierCurveTo(x1, y1, x2, y2, x, y)，确定两个控制点和终点。由于可以决定两个方向的弯曲，所以方案可行。

```js
bezierCurve() {
  ctx.strokeStyle = '#FA7E2A'
  ctx.beginPath()
  ctx.moveTo(455, 375)
  ctx.bezierCurveTo(430, 80, 650, 550, 650, 350)
  ctx.stroke()
},
```

 ![image.png](https://cdn.nlark.com/yuque/0/2022/png/22822169/1648023063286-2ac8cddf-39be-4449-a12c-2330d4a4b095.png)

如图确定了起始点和终点，可以往两个方向拉伸，不过还有一个问题，就是控制点比较难以控制，如何控制好曲线形状，可以选用辅助工具，如https://cubic-bezier.com/#1,.01,0,1，这个网站可以通过需要调整曲线形状，得到控制点的坐标，最后在项目中调整坐标定位到合适的位置。

## 单站 / 全国

### echart使用

#### 安裝依赖包

```
npm install echarts
```

#### 引入echarts

```js
import echarts from 'echarts'
```

#### 页面确定echart区域

注意一定要给div添加宽高，否则无法显示。

```vue
<div id="chart_example"></div>
<style scoped lang="less">
  #chart_example {
    width: 500px;
    height: 500px;
    border: 1px solid red;
    margin: 0 auto;
  }
</style>
```

#### 定义数据、图表样式

echart是集成的组件，通过向传输对象格式的数据，控制组件想要的参数。

```js
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
```

#### 初始化

```js
initEchart() {
  let myChart = echarts.init(document.getElementById('chart_example'))
  myChart.setOption(this.option)
},
```

### echart组件的构建

一个项目相同、不同组件中可能有多次使用到相同样式的图标，重复开发会导致代码冗余、不同人开发的细微样式出入等，所以主要构建统一组件，实现样式统一但数据不同的目的。

#### props传输必要参数

把项目中图表不变的因素写到子组件中，如的主题颜色，是否有悬浮提示，悬浮框样式等内容。把需要展示的动态值携程变量通过porps传输。

#### 监听父组件数据更新

当父组件数据更新时，porps只会在子组件构建时传输一次，所以要设置监听。

两点注意：

##### 父组件修改什么值

如果父组件修改的是对象里的某一个值，受ES5的限制，Vue.js不能检测到对象属性的添加或删除。如果父组件修改的是整个对象，则可以在子组件监听这个对象。

父组件

```js
this.chartData = {
	xlist: ['2018年', '2019年', '2021年', '2022年'],
	ylist: [100, 200, 100, 300],
}
```

子组件

```js
chartData: {
  immediate: true,
  handler: function (newVal, oldVal) {
    this.initEchart()
  },
},
```

##### 子组件的option定义的位置

不要定义在data里，要定义在函数中。因为data中的数据在构建的时候创建一次，其中定义的变量不会再随着变量值的改变而改变。

```js
initEchart() {
  let myChart = echarts.init(document.getElementById('chart_example'))
  myChart.setOption({
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
    xAxis: [
      {
        type: 'category',
        data: this.chartData.xlist,
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
        data: this.chartData.ylist,
      },
    ],
  })
},
```

#### 添加数据格式化

```js
axisLabel: {
  formatter: function (val) {
    return val + '❤'
  },
},
```

#### 自定义组件工具栏图标

toolbox有自带的工具图标，当自带的图标不能满足需要时，可采用以下方法：

```vue
<div
  :class="{ fullChart: true, fullActive: enlarge }"
  ref="fullChart"
></div>

<script>
data() {
	return { enlarge: false, myChart: null }
},
</script>

<style scoped lang="less">
.base-echart {
  height: 100%;
  width: 100%;
  overflow: hidden;
  flex: 1;
  box-sizing: border-box;
  height: 500px;

}
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
</style>
```

```js
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
```

##### 工具栏图标

icon后面跟的是工具栏图标的svg，获取矢量图的方法是从阿里巴巴矢量图官网https://www.iconfont.cn/，搜索/上传想要的图，点击svg模式下载，打开svg格式的图片，将d属性之后的全部内容进行拷贝，因为有的矢量图是多个矢量拼接而成，所以可能有多个d，都要拷贝出来进行拼接。

##### 点击图标触发的事件

onclick后面就是图标实现功能的函数

e.getoption()是e事件中的原型里的函数，用来获取到你在e中option中的所有配置项，可以在其中对echart的参数进行任意修改。e.setoption()就是对echart的option重新赋值，刷新图表。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22822169/1648211190972-77c96d69-c864-453c-b30d-822ed8802329.png)

opts.toolbox是图标工具栏数组，存的是你配置的所有工具栏，按顺序取值，可以获取到某一工具按钮。`opts.toolbox[0].feature.myFull.show = false`是设置工具栏隐藏，这个是按照交互规定来设置的，enlarge是用来控制放大后的div画布显示或隐藏，显示画布的样式fullActive注意写在fullChart下方，放大后的画布显示出来后，等页面完全渲染成功，重新将这个div定义为画布，并绘制图表。

### 轮播图注意事项

## vant 和 element ui

input删除按钮隐藏的思考

修改日期的组件的背景色

## vant日期组件没有年月日时