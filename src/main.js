import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import '@/assets/css/index.less'
import './mock.js'
import EnnAuthSdk from "@enncloud/enn-auth-sdk";
import { MonitorJS } from '@enncloud/frontend-monitor-sdk';
const echarts = require('echarts')
const moment = require('moment')

!(async function () {
  try {
    let authSdk = await EnnAuthSdk({
      appid: 'someapp', // 项目APPID
      baseUrl: 'http://unified-authentication-demo.test.fnwintranet.com', //项目后端接口地址
      accessKey: 'xysqFqn6X3sqasd', // 网关key
      env: 'develop', // 当前运行环境 develop or production
      warningCb: (message) => {}, //错误提示回调函数
    })
    Vue.prototype.authSdk = authSdk
    initVue()
  } catch (e) {
    initVue()
  }
})()
//鉴权sdk文档 https://confluence.enncloud.cn/pages/viewpage.action?pageId=469139726

function initVue() {
  
  new MonitorJS().init({
    pageId: 'someapp', //应用唯一标示
    env: MonitorJS.DEV, //上报错误地址
    consoleError: true,
    vueError: true, //是否上报Vue错误
    vue: Vue,
  })
  new MonitorJS().monitorPerformance({
    pageId: 'someapp', //应用唯一标示
    env: MonitorJS.DEV, //上报地址
  })
  //监控sdk文档 https://confluence.enncloud.cn/pages/viewpage.action?pageId=496370438

  Vue.prototype.$moment = moment
  Vue.prototype.$echarts = echarts
  Vue.prototype.$axios = axios
  Vue.config.productionTip = false
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
}
