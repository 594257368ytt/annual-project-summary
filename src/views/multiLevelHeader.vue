<template>
  <div class="multi-level-header">
    <h1>1、多级表头</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="150" min-width="50">
      </el-table-column>
      <el-table-column label="配送信息">
        <el-table-column prop="name" label="姓名" width="120%">
        </el-table-column>
        <el-table-column label="地址">
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>

    <h1>2、el-table合并单元格</h1>
    <h2>采用span-method绑定的方法对行列合并进行判断</h2>
    <h2>注意sortable属性的用法，用于对某列进行排序</h2>

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

    <h1>2、h5 table合并单元格</h1>
    <h2>采用rowspan/colspan对行列合并进行判断</h2>

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
  </div>
</template>

<script>
export default {
  name: 'multiLevelHeader',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
      ],
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
  },
  methods: {
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
  },
}
</script>
<style scoped lang="less">
.multi-level-header {
  padding: 50px;
  h1,
  h2 {
    margin-top: 50px;
    margin-left: 100px;
  }
  /deep/.el-table {
    margin-top: 40px;
    .el-table__header {
      margin-left: 100px;
    }
    .el-table__body {
      margin-left: 100px;
    }
  }
  table {
    margin-left: 100px;
    margin-top: 40px;
    th,
    td {
      border: 1px solid black;
    }
  }
}
</style>
