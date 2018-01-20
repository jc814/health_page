// store.js

import hospital from './modules/hospital'
import admin from './modules/admin'
import office from './modules/office'
import Vue from 'Vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    hospital,
    admin,
    office
  }
})

export default store
