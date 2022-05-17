<template>
  <div class="form">
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      popper-class="singleStationDateNodePopper"
    >
      <el-button slot="reference">hover 激活</el-button>
    </el-popover>
    <div class="pseudo-class"></div>
    <div class="pseudo-class2">没有更多了</div>
    <div class="pseudo-class3">div内容</div>
    <div class="parent">
      <div class="box1">1</div>
      <div class="box2">2</div>
    </div>
    <div class="parent2">3</div>
  </div>
</template>

<script>
export default {
  name: 'popper',
  components: {},
  data() {
    return { dateNodePopover: false }
  },
  methods: {},
}
</script>
<style scoped lang="less">
.form {
  height: 200%;
  width: 100%;
  background: cadetblue;
  .el-button {
    margin-left: 500px;
    margin-top: 100px;
  }
  .el-popover {
    margin-left: 100px;
    margin-top: 500px;
  }
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
  .pseudo-class {
    width: 100px;
    height: 100px;
    background: yellowgreen;
    margin-left: 500px;
    margin-top: 50px;
  }
  .pseudo-class::after {
    content: '';
    display: block;
  }
  .pseudo-class2 {
    margin-left: 500px;
    margin-top: 50px;
  }
  .pseudo-class2::before,
  .pseudo-class2::after {
    content: '';
    display: inline-block;
    width: 15%;
    margin: 5px 1%;
    border-bottom: 1px solid blue;
  }
  .parent {
    background: yellow;
    // height: 10px;
    // width: 200px;
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
}
</style>
<style>
.singleStationDateNodePopper.el-picker-panel .el-picker-panel__icon-btn {
  color: #0780ed;
}
.singleStationDateNodePopper.el-picker-panel .el-date-picker__header--bordered {
  border-color: #0780ed;
}
.singleStationDateNodePopper .el-date-table th {
  border-bottom: solid 1px #0780ed !important;
}
.singleStationDateNodePopper .el-year-table .cell {
  color: #ffffff;
}
.singleStationDateNodePopper.el-picker-panel.el-year-table.current {
  background: #0780ed;
}
.singleStationDateNodePopper.el-picker-panel,
.EVAPoper {
  background: #112b84 !important;
  border: 5px solid #0780ed !important;
}
.singleStationDateNodePopper .el-year-table td .cell,
.singleStationDateNodePopper .el-month-table td .cell,
.singleStationDateNodePopper .el-date-table td span,
.singleStationDateNodePopper .el-date-table th {
  color: #fff !important;
}
.singleStationDateNodePopper .popper__arrow {
  border-bottom-color: #0780ed !important;
  border-top-color: #0780ed !important;
}
.singleStationDateNodePopper .popper__arrow:after {
  border-bottom-color: #112b84 !important;
  border-top-color: #112b84 !important;
}
.singleStationDateNodePopper .el-date-picker__header-label {
  color: #fff !important;
}
</style>
