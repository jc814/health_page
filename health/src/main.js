// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from 'router'
import AMap from 'vue-amap'
import Vuex from 'vuex'
import store from 'store/index.js'

Vue.use(ElementUI)
Vue.use(AMap)
Vue.use(Vuex)
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '459137a5337d8e5c05dcde374c82bcb2',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
router.beforeEach((to, from, next) => {
  if (to.path === '/adminLogin') {
    next()
  }
  if (window.sessionStorage.token) {
    if (to.matched.some(record => record.meta.auth)) {
      if (window.sessionStorage.type === '1' || window.sessionStorage.type === '0') {
        next()
      } else {
        next({path: '/adminLogin', query: {code: '402'}})
      }
    } else {
      next()
    }
  } else {
    next({path: '/adminLogin', query: {code: '401'}})
  }
})
