// store.js

import hospital from 'store/modules/hospital'
import admin from 'store/modules/admin'
import office from 'store/modules/office'
import Vue from 'Vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    id: '',
    name: '',
    token: '',
    type: ''
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, token) => {
      state.name = name
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TYPE: (state, type) => {
      state.type = type
    }
  },
  actions: {

  },
  modules: {
    hospital,
    admin,
    office
  },
  getters: {
    id: state => { return state.id },
    name: state => { return state.name },
    token: state => { return state.token },
    type: state => { return state.type }
  }
})

export default store
