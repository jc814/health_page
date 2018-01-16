// store.js
import Vue from 'Vue'
import Vuex from 'vuex'
import fetch from '../util/fetch'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
  },
  mutations: {

  },
  actions: {
    selectHospitals () {
      return fetch('http://localhost:9090/hospital/selectAllRecord', null)
    }
  }
})

export default store
