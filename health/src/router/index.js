import Vue from 'vue'
import Router from 'vue-router'
import layout from 'view/layout/layout'
import report from 'view/system/report'
import admin from 'view/system/admin'
import bespeakLook from 'view/system/bespeakLook'
import doctor from 'view/system/doctor'
import hospital from 'view/system/hospital'
import office from 'view/system/office'
import workShift from 'view/system/workShift'
import workShiftManage from 'view/system/workShiftManage'
import comment from 'demo/comment'
import map from 'demo/map'
import table from 'demo/table'
import adminLogin from 'view/system/adminLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      meta: {
        auth: true // 这里设置，当前路由需要校验
      },
      children: [
        {
          path: '/',
          component: office
        }, {
          path: '/report',
          component: report
        }, {
          path: '/admin',
          component: admin
        }, {
          path: '/bespeakLook',
          component: bespeakLook
        }, {
          path: '/doctor',
          component: doctor
        }, {
          path: '/hospital',
          component: hospital
        }, {
          path: '/office',
          component: office
        }, {
          path: '/workShift',
          component: workShift
        }, {
          path: '/workShiftManage',
          component: workShiftManage
        }, {
          path: '/comment',
          component: comment
        }, {
          path: '/map',
          component: map
        }, {
          path: '/table',
          component: table
        }
      ]
    }, {
      path: '/adminLogin',
      component: adminLogin
    }, {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})
