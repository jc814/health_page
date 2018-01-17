// store.js

import hospital from './modules/hospital'
import Vue from 'Vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    hospital
  }
})

export default store
