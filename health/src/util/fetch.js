import axios from 'axios'
import Qs from 'qs'
import { MessageBox } from 'element-ui'
import store from 'store/index.js'
import router from 'router'

var storage = window.sessionStorage

var service = axios.create({
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  baseURL: 'http://localhost:9090',
  timeout: 120000
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求拦截器
service.interceptors.request.use(function (config) {
  if (storage.getItem('token') !== null && storage.getItem('token') !== '') {
    config.headers.Authorization = storage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(function (response) {
  const code = response.data
  var message = ''
  var flag = false
  if (!code.success) {
    switch (code.errorCode) {
      case 6001:
        message = '您未登录，请登录后再操作'
        flag = true
        break
      case 6002:
        message = '非法身份信息，请登录后再操作'
        flag = true
        break
      case 6003:
        message = '会话过期，请重新登录'
        flag = true
        break
      default:
        message = '未知异常，请联系管理员'
    }
    if (flag) {
      MessageBox.confirm(message, '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('loginOut').then(() => {
          router.push('adminLogin')
        })
      })
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

// 封装axios的post请求
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  commonApi (url, params) {
    return fetch(url, params)
  }
}
