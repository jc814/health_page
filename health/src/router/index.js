import Vue from 'vue'
import Router from 'vue-router'
import layout from '../view/layout/layout'
import report from '../view/system/report'
import admin from '../view/system/admin'
import bespeakLook from '../view/system/bespeakLook'
import doctor from '../view/system/doctor'
import hospital from '../view/system/hospital'
import office from '../view/system/office'
import schedule from '../view/system/schedule'
import scheduleArrange from '../view/system/scheduleArrange'
import comment from '../demo/comment'
import map from '../demo/map'
import table from '../demo/table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/',
          component: table
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
          path: '/schedule',
          component: schedule
        }, {
          path: '/scheduleArrange',
          component: scheduleArrange
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
      path: '/haha',
      component: comment
    }
  ]
})
