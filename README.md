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

#### for循环下的轮播图数据发生同步现象

微燃机app的运行分析组件中，使用到用for循环循环轮播图，期间遇到这一个问题：轮播图中每一个元素翻页同步，data数据同步，由于当时时间紧迫，所以采用了最笨的方法，给每一个轮播图中用到的数据单独进行定义，包括日期，echarData，每个轮播图的页数等等。

上线结束后，又对该问题进行了思考，该问题会在什么情况下出现？能否通过抽取组件来解决？

##### 什么情况下出现

写了一个demo复现了当时的场景

###### 当翻页按钮在轮播图之外

轮播图内部的数据不会发生同步现象，但轮播图插槽引入的指示器数据，发生了同步。如图所示。点击for循环中第一个元素的向右翻页按钮，只有1号元素翻页，但是所有元素的指示器都同步指向第二页。这种情况插槽内元素没有达到独立data的期望，需要给插槽的data单独判断，所以这种写法不推荐。

![image-20220515065827822](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220515065827822.png)

###### 当翻页按钮在轮播图之内

这种情况下所有的数据都是同步的，点击第一页按钮，其他所有元素的数据全部发生改变，这也是运行分析组建中遇到的场景。

![image-20220515191448933](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220515191448933.png)

###### 将轮播图（内容+插槽+翻页按钮）抽取组件

抽取组件后，循环组件，组件内部都是独立data，这种方法实现了循环条件下的轮播图。如图所示，当点击第一页按钮，数据、按钮、指示器皆为独立存在。

![image-20220515191739815](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220515191739815.png)

这种方法父组件代码如下：

```vue
<template>
  <div class="swipe">
    <h3>当按钮在轮播图内</h3>
    <div v-for="index in 3" :key="index">
      <!-- {{ index }} -->
      <Swipe :loopIndex="index"></Swipe>
    </div>
  </div>
</template>

<script>
import Swipe from './components/swipe3.vue'
export default {
  name: 'swipe3',
  components: { Swipe },
  data() {
    return {
      active: 1,
      total: 4,
      nowIndex: 0,
    }
  },
  methods: {
    getIndex(index) {
      this.nowIndex = index
      console.log('this.nowIndex :>> ', this.nowIndex)
    },
    changePage(index) {
      console.log('this.ref :>> ', this.$refs.swipe0[0])
      // this.ref
      this.$refs[`swipe${index - 1}`][0] &&
        this.$refs[`swipe${index - 1}`][0].next()
    },
  },
}
</script>
```

子组件代码如下：

```vue
<template>
  <div class="swipe3-child">
    <van-swipe
      :show-indicators="false"
      @change="getIndex"
      :ref="`swipe${loopIndex - 1}`"
    >
      <van-swipe-item
        ><el-button @click="changePage(loopIndex)"
          >第{{ nowIndex }}页按钮</el-button
        >
        <h4>我是第{{ loopIndex }}页,第{{ nowIndex }}个</h4>
      </van-swipe-item>
      <van-swipe-item
        ><el-button @click="changePage(loopIndex)"
          >第{{ nowIndex }}页按钮</el-button
        >
        <h4>我是第{{ loopIndex }}页,第{{ nowIndex }}个</h4>
      </van-swipe-item>
    </van-swipe>
    <div class="my-indicator-group">
      <div
        class="my-indicator my-indicator1"
        :class="{ indicatorActive: nowIndex === 0 }"
      ></div>
      <div
        class="my-indicator my-indicator2"
        :class="{ indicatorActive: nowIndex === 1 }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swipe3',
  components: {},
  props: {
    loopIndex: {
      type: Number,
      default: () => {},
    },
  },
  data() {
    return {
      active: 1,
      total: 4,
      nowIndex: 0,
    }
  },
  methods: {
    getIndex(index) {
      this.nowIndex = index
      console.log('this.nowIndex :>> ', this.nowIndex)
    },
    changePage(index) {
      console.log('this.ref :>> ', this.$refs.swipe0)
      // this.ref
      this.$refs[`swipe${index - 1}`] && this.$refs[`swipe${index - 1}`].next()
    },
  },
}
</script>
```

### table宽度问题/多级表头/合并单元格

#### 列宽需要注意的问题

##### winth与minwidth都不设置

el-table-column不设置width与minwidth,每一列自适应，宽度一致

##### winth与minwidth都设置

el-table-column同时设置min-width和width后，该列表格就会按照width来设置，相当于width就是一个最大宽度。

代码和显示结果如下：

```html
<el-table-column prop="date" label="日期" width="150" min-width="50">
</el-table-column>
```

![image-20220516025847791](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220516025847791.png)

##### 宽度width属性失效   

1、当列设置了type="index"，此时width属性失效，可以让后端返回序号然后去掉type="index"，就可以修改宽度值了。

2、el-table-column设置width=30%，无效。会被当成width=30px，代码和结果如图：

```html
<el-table-column prop="name" label="姓名" width="120%">
</el-table-column>
```

![image-20220516030845548](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220516030845548.png)

##### 设置了min-width，如何保证每列都按百分比分配宽度

el-table-column设置min-width="30"或者30%，每一列都设置min-width才能实现每一列的百分比配置。

#### el-table多级表头

通过el-table-column的嵌套来完成，外层的无需绑定prop，tableData，还是一维数组，一条数据对应一个对象。代码和结果在element ui文档中有，这里就不做展示。

#### el-table合并单元格

element ui采用的合并表格单元格的方法是给el-table添加一个属性span-method，该属性绑定一个方法，方法自动传参Function({ row, column, rowIndex, columnIndex })，该参数返回的是，{该单元格所在行的对象、该单元格所在列的对象、该单元格第几行、该单元格是第几列}，根据微燃机动力生产报表组件的要求，上一行与下一行之间如果年份相同，则合并这一列相同年份单元格，具体实现需要考虑如下两个问题：

##### 接口数据格式

后端返回接口本来是考虑data下面返回所有年份数组，如果当年有多天数组，则数组下面嵌套多条年份，但后来发现由于table的渲染机制，tableData必须符合这样的规则：data下面必须是行，行下面必须是列。data外层可以随意嵌套其他数据，列的下面也可以随意嵌套，但行列数据之间不可嵌套，否则无法实现渲染，所以与后端沟通，数据还是逐条返回，每条是一个行对象，行对象里面是列名键值对。但是每个行对象里面要加两个标志位flag和num，如果这是所有相同年份中的第一条数据，则flag为false，否则为true，这一标志位的主要作用是使用标志位将年份相同的数据切分开来，便于判断从哪里开始要开始合并单元格了，第二个标志位num代表相同年份的这一组数据一共有多少条，通过这两种标志位的设计，我们就解决了不用嵌套就能将所有列按年份划分出来。

##### 如何根据数据格式合并单元格

首先判断该列columnIndex是否是时间那一列，是则继续判断该列是否是相同年份的第一条数据，如果是将下面的num行都合并，列不用合并所以返回1，根据span-method绑定函数的返回标准[rowspan,colspan]，返回[num，1]，如果不是第一条数据就要让该条数据占一行，但该列数据不显示，所以返回[1,0]。

至此就实现了el-table的合并单元格功能。

代码和效果如下：

```vue
<el-table
  :data="tableData2"
  :span-method="arraySpanMethod"
  border
  style="width: 100%"
>
  <el-table-column prop="id" label="ID" width="180"> </el-table-column>
  <el-table-column prop="time" label="时间" width="180"> </el-table-column>
  <el-table-column prop="name" label="姓名" width="180" min-width="300">
  </el-table-column>
  <el-table-column prop="amount1" sortable label="数值 1">
  </el-table-column>
  <el-table-column prop="amount2" sortable label="数值 2">
  </el-table-column>
  <el-table-column prop="amount3" sortable label="数值 3">
  </el-table-column>
</el-table>
<script>
data(){
    return{
         tableData2: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          time: '2018',
          flag: false,
          num: 3,
        },
        {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12,
          time: '2018',
          flag: true,
          num: 3,
        },
        {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          time: '2018',
          flag: true,
          num: 3,
        },
        {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17,
          time: '2019',
          flag: false,
          num: 2,
        },
        {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15,
          time: '2019',
          flag: true,
          num: 2,
        },
        {
          id: '12987127',
          name: '王小虎',
          amount1: '100',
          amount2: '4.23',
          amount3: 121,
          time: '2022',
          flag: false,
          num: 1,
        },
      ],
    }
    methods:{
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
          console.log(
            'row, column, rowIndex, columnIndex :>> ',
            row,
            column,
            rowIndex,
            columnIndex
          )
          if (columnIndex === 1 && row.flag === false) {
            return [row.num, 1]
          } else if (columnIndex === 1 && row.flag === true) {
            return [1, 0]
          }
      },
    }
}
</script>
```

![image-20220517063131803](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517063131803.png)

#### h5原生table合并单元格写法

这种写法不需要用到函数，另外数据节后和el-table是一样的。主要思想是，采用table中的rowspan和colspan属性，rowspan是标签<td>的属性，colspan是<tr>标签属性，表示该单元格可以横跨几行或几列。如果是上下单元格合并就是横跨行，使用rowspan，具体代码和结果如下：

```html
<table width="80%" class="table" ref="table">
  <tr>
    <th>id</th>
    <th>时间</th>
    <th>姓名</th>
    <th>数值1</th>
    <th>数值2</th>
    <!-- <th>数值3</th> -->
  </tr>
  <tr v-for="(items, indexs) in tableData2" :key="'table' + indexs">
    <td width="20%">{{ items.id }}</td>
    <td
      width="20%"
      v-if="items.flag === false && items.num >= 1"
      :rowspan="items.num"
    >
      {{ items.time }}
    </td>
    <td width="20%">
      {{ items.name }}
    </td>
    <td width="20%">
      {{ items.amount1 }}
    </td>
    <td width="20%">
      {{ items.amount2 }}
    </td>
  </tr>
</table>
```

![image-20220517063641198](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517063641198.png)

逐条循环显示行，当判断到这一行的数据要开始合并单元格，则横跨items.num行。

## vant 和 element ui

### input删除按钮隐藏的思考

el-input有一个特别的问题，如果你添加了clearable清除按钮，它只会在input框获得焦点，并且输入框有值得情况下出现，当审查元素时想要点击span元素审查样式，会发现el-input此时失焦，点击span后，span在dom树上消失。如图所示。

![image-20220515055321870](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220515055321870.png)

针对span元素无法审查这一现象，思考了多种解决方案。

#### 使用谷歌浏览器自带的强制focus功能

右键元素->强制执行状态->：focus

这种方法没有达到预期效果，虽然是处于focus状态，但删除按钮仍未显示，此方法可用作其他情况下调试代码。如图，黄色点标记代表已经强制聚焦，span未显示。

![image-20220515063738908](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220515063738908.png)

使用debugger终止变化

给el-input绑定属性`@blur="onBlur"`，当input框想要失焦时，进入debugger状态，这种方法有效。如图，此时span可以点击，也可以看其中的css样式。

![image-20220515063933825](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220515063933825.png)

修改日期的组件的背景色

### DatePicker日期组件、Popover 弹出框修改背景色

在微燃机单站项目中，主色调为蓝色，当点击日期组件，还是白色会显得突兀，所以需要修改日期组建的背景色，故而在app.vue添加了全局样式，但组件打包后不会包含app.vue中的样式，导致本地修改成功的样式，在测试环境无法正常显示。经过多种尝试找到了解决方案：再写一个不带scope属性的style，将要修改的样式放入，给日期组件的popper-class属性添加一个独一无二的类名，避免影响其他组件。

这种写法的主要原理是，一个组件可以写很多个style。不过一般会有两个是因为一个要带scoped属性，这个是约束你在这个style里面写的样式会在编译的阶段给你的选择器（class、id等）加上一个唯一标识（相当于命名空间），避免因为同名二引起样式冲突。但是有的时候我们需要去覆盖些全局的样式，所有就有了不带scoped的style标签。当两种同时出现的时候，一个影响全局一个影响自身组件。一个vue文件可以写多个style，这并不影响，但没有什么意思，所以大家一般只写一到两个。

### Popover 弹出框的尖角样式修改

首先Popover 弹窗的尖角是三角形，这涉及到一个css样式表示三角形的知识。

#### CSS绘制三角形

css绘制三角形的原理是根据css设置一个很宽的border，四个边的对角处就会形成三角形的斜边。

首先绘制一个粗边框div，如图中间的红色方形是div的content，彩色部分是div的border。

```html
<div class="div1"></div>
<style>
  .div1 {
    margin-top: 50px;
    margin-left: 100px;
    width: 30px;
    height: 30px;
    background-color: rgb(187, 23, 53);
    border-top: 100px solid rgb(209, 122, 82);
    border-bottom: 100px solid rgb(223, 208, 79);
    border-left: 100px solid rgb(112, 155, 144);
    border-right: 100px solid rgb(123, 148, 177);
  }
</style>
```

![image-20220517040634014](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517040634014.png)

接下来将div的content部分宽高置0，如图

```html
<div class="div2"></div>
<style>
.div2 {
    margin-top: 50px;
    margin-left: 100px;
    width: 0px;
    height: 0px;
    background-color: rgb(187, 23, 53);
    border-top: 100px solid rgb(209, 122, 82);
    border-bottom: 100px solid rgb(223, 208, 79);
    border-left: 100px solid rgb(112, 155, 144);
    border-right: 100px solid rgb(123, 148, 177);
}
</style>
```

![image-20220517040811778](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517040811778.png)

最后一步，想获得朝上的三角形，也就是黄色部分，只需要将上、左、右边框的透明度变为0，这里一定要改透明度而不是宽度，如果取消了边框宽度，没有周围边框加持，斜角就不存在了。

```html
<div class="div3"></div>
<style>
  .div3 {
    margin-top: 50px;
    margin-left: 100px;
    width: 0px;
    height: 0px;
    border-top: 100px solid rgba(0, 0, 0, 0);
    border-bottom: 100px solid rgb(223, 208, 79);
    border-left: 100px solid rgba(0, 0, 0, 0);
    border-right: 100px solid rgba(0, 0, 0, 0);
  }
</style>
```

![image-20220517041326699](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517041326699.png)

#### Popover 尖角三角形样式

观察Popover 尖角的样式，会发现其实是由两个三角形组成的。三角形浅蓝色边框实现方法是，绘制两个三角形，底部是浅蓝色三角形，上面覆盖一个较小的深蓝色三角形，上面的三角形设置一些top偏移量，让底部的三角形漏出一些边缘，当做这个尖角部分的外边框。

![image-20220517041448784](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517041448784.png)

这个元素结构以及样式如图所示：

![image-20220517042307204](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517042307204.png)

这个底部的三角形使用的是`.popper__arrow`样式，而覆盖在顶部的三角形使用的是伪类`.popper__arrow::after`样式，这就涉及到伪类的相关用法

##### 基本用法

首先伪类一定要写content:''，是在原div的位置添加一个content内容的行内元素，如图所示：

```html
<div class="pseudo-class"></div>
<style>
  .pseudo-class {
    width: 100px;
    height: 100px;
    background: yellowgreen;
    margin-left: 500px;
    margin-top: 50px;
  }
  .pseudo-class::after {
    content: '###';
  }
</style>
```

![image-20220517043828350](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517043828350.png)

##### 转换为块状元素覆盖在原div上方

这种用法就是Popover 尖角的用法，将伪类的行内元素转化为块状元素，就可以使用border属性将其转变为覆盖在其上方的新的三角形。再回头去看伪类的css样式，不难看出，其添加了伪类必备的content以及转换为块状元素的语句。

![image-20220517044003212](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517044003212.png)

##### 伪类实现特殊样式

项目中经常会遇到显示如下图所示的样式，用三个div排列就显得较为繁琐，用伪类就可以解决。至于为什么这个伪类没有在元素内部显示，因为这种情况需要给原div添加文本内容，并设置为行内块级元素，这样所有元素都能显示在同一行了，将上诉基本用法稍加修改如图。

```html
<div class="pseudo-class2">没有更多了</div>
<style>
  .pseudo-class2::before,
  .pseudo-class2::after {
    content: '';
    display: inline-block;
    width: 15%;
    margin: 5px 1%;
    border-bottom: 1px solid blue;
  }
</style>
```

![image-20220517045023960](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517045023960.png)

```html
 <div class="pseudo-class3">div内容</div>
 <style>
   .pseudo-class3 {
    width: 100px;
    height: 100px;
    background: yellowgreen;
    margin-left: 500px;
    margin-top: 50px;
  }
  .pseudo-class3::after {
    content: '  after伪类内容';
    // display: block;
  }
 </style>
```

![image-20220517051149697](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517051149697.png)

##### 伪类清除浮动

首先当前面两个元素浮动，其父元素不会被子元素撑开，且高度变为0，需要强制设置宽高才能显示，在父元素后面添加的div也会受到影响如图所示，黄色部分是强制添加了宽高的父元素，蓝色部分是后面添加的div，都出现了位置塌陷，但只要在父元素中的after伪类添加一个空的content，并设置为块级元素，并设置clear:both，父元素就会依据子元素撑开。

这是父元素塌陷的代码和效果

```html
<div class="parent">
  <div class="box1">1</div>
  <div class="box2">2</div>
</div>
<div class="parent2">3</div>
<style>
.parent {
    background: yellow;
    height: 10px;
    width: 200px;
  }
  .box1 {
    width: 50px;
    height: 50px;
    background-color: rgb(197, 74, 74);
    float: left;
  }
  .box2 {
    width: 50px;
    height: 100px;
    background-color: rgb(202, 161, 100);
    float: left;
  }
  .parent2 {
    width: 150px;
    height: 30px;
    background-color: blue;
    color: #fff;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    z-index: 9;
  }
</style>
```

![image-20220517052821083](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517052821083.png)

这是清除浮动之后的代码和效果，可以看到父元素被撑开并且蓝色div纵向排列在黄色块的下面：

```css
.parent {
	background: yellow;
}
.box1 {
    width: 50px;
    height: 50px;
    background-color: rgb(197, 74, 74);
    float: left;
}
.box2 {
    width: 50px;
    height: 100px;
    background-color: rgb(202, 161, 100);
    float: left;
}
.parent2 {
    width: 150px;
    height: 30px;
    background-color: blue;
    color: #fff;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    z-index: 9;
}
.parent:after {
    content: '';
    display: block; //设为块状元素
    clear: both; //用这个属性来清除浮动
}
```

![image-20220517053048890](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517053048890.png)

伪类介绍完毕，回到Popover的部分，接上文提到的，popver是使用伪类创建了两个三角形，一个在底部漏出部分作为外边框，另一个在上面，作为三角形的content，在分析三角形的样式如何书写就很容易了，底部和顶部三角形绘制原理相同，顶部可以不设置宽度，右下左设置宽度6px，底部颜色填充成想显示的颜色，其余border颜色设置为透明，如图所示：

![image-20220517054855576](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517054855576.png)

只是上面的三角形比下面的三角形多了一个top偏移量：

![image-20220517054959629](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220517054959629.png)