import fetch from 'util/fetch'

const doctor = {
  // 定义状态
  namespaced: true,
  actions: {
    selectDoctorByOfficeId ({commit}, param) {
      return fetch.commonApi('/doctor/selectOfficeHospitalId', param)
    },
    updateDoctor ({commit}, param) {
      return fetch.commonApi('/doctor/updateRecord', param)
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
