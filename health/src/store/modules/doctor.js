import fetch from 'util/fetch'

const doctor = {
  // 定义状态
  namespaced: true,
  actions: {
    selectDoctors ({commit}, param) {
      return fetch.commonApi('/doctor/selectAllRecord', param)
    },
    updateDoctor ({commit}, param) {
      return fetch.commonApi('/doctor/updateRecordById', param)
    },
    insertDoctor ({commit}, param) {
      return fetch.commonApi('/doctor/insertRecord', param)
    },
    deleteDoctor ({commit}, param) {
      return fetch.commonApi('/doctor/deleteRecord', param)
    }
  }
}

export default doctor
