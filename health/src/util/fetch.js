import axios from 'axios'
import Qs from 'qs'

var service = axios.create({
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  baseURL: 'http://localhost:9090',
  timeout: 5000
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求拦截器
service.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(function (response) {
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
