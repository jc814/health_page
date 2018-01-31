import fetch from 'util/fetch'

const admin = {
  // 定义状态
  namespaced: true,
  state: {
    id: '',
    name: '',
    hospitalId: '',
    photo: '',
    lastTime: '',
    type: ''
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_HOSPITALID: (state, hospitalId) => {
      state.hospitalId = hospitalId
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_LASTTIME: (state, lastTime) => {
      state.lastTime = lastTime
    }
  },
  actions: {
    adminSignIn ({commit}, param) {
      return fetch.commonApi('/admin/adminLogin', param)
    },
    adminIn ({commit}, param) {
      commit('SET_ID', param.id)
      commit('SET_NAME', param.name)
      commit('SET_HOSPITALID', param.hospitalId)
      commit('SET_PHOTO', param.photo)
      commit('SET_TYPE', param.type)
      commit('SET_LASTTIME', param.lastTime)
    },
    adminOut ({commit}, param) {
      commit('SET_ID', null)
      commit('SET_NAME', null)
      commit('SET_HOSPITALID', null)
      commit('SET_PHOTO', null)
      commit('SET_TYPE', null)
      commit('SET_LASTTIME', null)
    }
  },
  getters: {
    id: state => { return state.id },
    name: state => { return state.name },
    hospitalId: state => { return state.hospitalId },
    photo: state => { return state.photo },
    type: state => { return state.type },
    lastTime: state => { return state.lastTime }
  }
}

export default admin
