import { v4 as uuidv4 } from 'uuid'
import {getEntPermission} from '@/api/index.js'
// echarts字体自适应
export const echartsFont = size => {
  let htmlFont
  if (screen.width > 750) {
    htmlFont = 75
  } else {
    htmlFont = screen.width / 10
  }
  return size * htmlFont
}
//展示native的头部
export function showTitleBottom (self) {
  let el = self
  let plateform = sessionStorage.getItem('plateform')
  if (plateform === 'android') {
    window.control.callHandler('bottom_title', 'show')
    el.$emit('changeTabStatus', false)
  } else if (plateform === 'ios') {
    window.webkit.messageHandlers.js_closeHomeFullScreen.postMessage(null)
    el.$emit('changeTabStatus', false)
  } else {

  }
}
//隐藏native的头部
export function hideTitleBottom (self) {
  let el = self
  let plateform = sessionStorage.getItem('plateform')
  if (plateform === 'android') {
    window.control.callHandler('bottom_title', 'invisible')
    el.$emit('changeTabStatus', true)
  } else if (plateform === 'ios') {
    window.webkit.messageHandlers.js_openHomeFullScreen.postMessage(null)
    el.$emit('changeTabStatus', true)
  } else {

  }
}
// 深拷贝
function type (obj) { 
  let toString = Object.prototype.toString
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}
// 深拷贝
export function cloneDeep (data) {
  let t = type(data)
  let o
  let i
  let ni
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(cloneDeep(data[i]))
    }
    return o
  } else if (t === 'object') {
    for (i in data) {
      o[i] = cloneDeep(data[i])
    }
    return o
  }
}
//跳转native登陆
export function goNativeLogin () {
  let plateform = sessionStorage.getItem('plateform')
  if (plateform === 'android') {
    console.log('android token_invalid ')
    window.control.callHandler('token_invalid', JSON.stringify({}))
  } else if (plateform === 'ios') {
    console.log('ios token_invalid ')
    window.webkit.messageHandlers.token_invalid.postMessage(JSON.stringify({}))
  }
}

// 控制是否有下拉刷新功能
/**
 *
 * @param vm  组件中的this,vueComponent
 * @param bool  是否禁止下拉刷新 true 禁止 false 不禁止
 */
export function ctrolRefresh (vm, bool) {
  vm.$emit('ctrolRefresh', bool)
}
//时间格式化
/**
 * Parse the time to string
 * @param {(object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}
//获取url的参数
/**
 * get url querystring parameter
 * @param {string} name
 * @returns {string | null}
 */
export function getQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let str = window.location.hash
  let index = str.indexOf('?')
  let result = str.substring(index + 1, str.length)
  let r = result.match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return null
}
//存储
export let session = {
  set (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  get (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  remove (key) {
    sessionStorage.removeItem(key)
  }
}

// 雪花算法
export function Snowflake () {
  let bigInt = require('big-integer')
  let Snowflake = /** @class */ (function () {
    function Snowflake (_workerId, _dataCenterId, _sequence) {
      this.twepoch = 0
      this.workerIdBits = 5
      this.dataCenterIdBits = 5
      this.maxWrokerId = -1 ^ (-1 << this.workerIdBits) // 值为：31
      this.maxDataCenterId = -1 ^ (-1 << this.dataCenterIdBits) // 值为：31
      this.sequenceBits = 12
      this.workerIdShift = this.sequenceBits // 值为：12
      this.dataCenterIdShift = this.sequenceBits + this.workerIdBits // 值为：17
      this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits // 值为：22
      this.sequenceMask = -1 ^ (-1 << this.sequenceBits) // 值为：4095
      this.lastTimestamp = -1
      // 设置默认值,从环境变量取
      this.workerId = 1
      this.dataCenterId = 1
      this.sequence = 0
      if (this.workerId > this.maxWrokerId || this.workerId < 0) {
        throw new Error('config.worker_id must max than 0 and small than maxWrokerId-[' + this.maxWrokerId + ']')
      }
      if (this.dataCenterId > this.maxDataCenterId || this.dataCenterId < 0) {
        throw new Error('config.data_center_id must max than 0 and small than maxDataCenterId-[' + this.maxDataCenterId + ']')
      }
      this.workerId = _workerId
      this.dataCenterId = _dataCenterId
      this.sequence = _sequence
    }

    Snowflake.prototype.tilNextMillis = function (lastTimestamp) {
      let timestamp = this.timeGen()
      while (timestamp <= lastTimestamp) {
        timestamp = this.timeGen()
      }
      return timestamp
    }
    Snowflake.prototype.timeGen = function () {
      return Date.now()
    }
    Snowflake.prototype.nextId = function () {
      let timestamp = this.timeGen()
      if (timestamp < this.lastTimestamp) {
        throw new Error('Clock moved backwards. Refusing to generate id for ' +
          (this.lastTimestamp - timestamp))
      }
      if (this.lastTimestamp === timestamp) {
        this.sequence = (this.sequence + 1) & this.sequenceMask
        if (this.sequence === 0) {
          timestamp = this.tilNextMillis(this.lastTimestamp)
        }
      } else {
        this.sequence = 0
      }
      this.lastTimestamp = timestamp
      let shiftNum = (this.dataCenterId << this.dataCenterIdShift) |
        (this.workerId << this.workerIdShift) |
        this.sequence // dataCenterId:1,workerId:1,sequence:0  shiftNum:135168
      let nfirst = new bigInt(String(timestamp - this.twepoch), 10)
      nfirst = nfirst.shiftLeft(this.timestampLeftShift)
      let nnextId = nfirst.or(new bigInt(String(shiftNum), 10)).toString(10)
      return nnextId
    }
    return Snowflake
  }())
  let tempSnowflake = new Snowflake(1, 1, 0)
  let tempId = tempSnowflake.nextId()
  return tempId
}

// 生成uuid
export function createUuidAndSnowflake () {
  let uuid = uuidv4().slice(-4)
  // console.log(uuid)
  let snowflake = Snowflake().slice(-4)
  return uuid + '_' + snowflake
}

/**
 * 使用test方法实现模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export function fuzzyQuery (list, keyWord) {
  let reg = new RegExp(keyWord)
  let arr = []
  list.forEach((value, index) => {
    let compTeam = value.children.filter((val, idx) => {
      return reg.test(val.label)
    })
    let obj = JSON.parse(JSON.stringify(value))
    if (compTeam.length) {
      obj.children = compTeam
      arr.push(obj)
    }
  })
  return arr
}

// 防抖
export function debounce (fn,delay=300) {
  let timer
  return function(){
    console.log(timer)
    if(timer){
      
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null 
      fn.apply(this,arguments)
    }, delay)
  }
}
//随机字符串
export function randomString(e) {    
  e = e || 32
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

