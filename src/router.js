import Home from './views/Home.vue'
import form from './views/form.vue'
import table from './views/table.vue'
import canvas from './views/canvas.vue'
import echart from './views/echart.vue'
import echartParent from './views/echartParent.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/form',
      name: 'form',
      component: form,
    },
    {
      path: '/table',
      name: 'table',
      component: table,
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: canvas,
    },
    {
      path: '/echart',
      name: 'echart',
      component: echart,
    },
    {
      path: '/echartParent',
      name: 'echartParent',
      component: echartParent,
    },
  ],
  scrollBehavior: () => ({
    x: 0,
    y: 0
  })
})
router.beforeEach((to, from, next) => {
  // ...
  document.title = to.meta.title || ''
  next()
})
// 解决Loading chunk (\d)+ failed问题
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    location.reload()
  }
})
export default router
