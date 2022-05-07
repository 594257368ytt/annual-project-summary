// 使用 Mock
let Mock = require('mockjs')
Mock.mock('/moveDataSource', 'post', {
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'code': 200,
  'message': 'success',
  'data': {}
})
