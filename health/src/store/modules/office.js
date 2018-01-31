import fetch from 'util/fetch'

const office = {
  // 定义状态
  namespaced: true,
  actions: {
    selectOfficeHospitalId ({commit}, param) {
      return fetch.commonApi('/office/selectOfficeHospitalId', param)
    },
    updateOffice ({commit}, param) {
      return fetch.commonApi('/office/updateRecord', param)
    },
    insertOffice ({commit}, param) {
      return fetch.commonApi('/office/insertRecord', param)
    },
    deleteOffice ({commit}, param) {
      return fetch.commonApi('/office/deleteRecord', param)
    }
  }
}

export default office
