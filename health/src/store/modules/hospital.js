import fetch from '../../util/fetch'

const hospital = {
  // 定义状态
  state: {
    id: '',
    name: '',
    phone: '',
    address: '',
    brief: '',
    lng: '',
    lat: ''
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_ADDRESS: (state, address) => {
      state.address = address
    },
    SET_BRIEF: (state, brief) => {
      state.brief = brief
    },
    SET_LNG: (state, lng) => {
      state.lng = lng
    },
    SET_LAT: (state, lat) => {
      state.lat = lat
    }
  },
  actions: {
    selectHospitals (param) {
      return fetch.commonApi('/hospital/selectAllRecord', param)
    },
    updateHospital ({commit}, param) {
      return fetch.commonApi('/hospital/updateRecordById', param)
    },
    insertHospital ({commit}, param) {
      return fetch.commonApi('/hospital/insertRecord', param)
    }
  }
}

export default hospital
