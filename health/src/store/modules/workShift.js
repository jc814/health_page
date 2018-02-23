import fetch from 'util/fetch'

const workShift = {
  // 定义状态
  namespaced: true,
  actions: {
    selectWorkShift ({commit}, param) {
      return fetch.commonApi('/workShift/selectAllRecord', param)
    },
    updateWorkShift ({commit}, param) {
      return fetch.commonApi('/workShift/updateRecordById', param)
    },
    insertWorkShift ({commit}, param) {
      return fetch.commonApi('/workShift/insertRecord', param)
    },
    deleteWorkShift ({commit}, param) {
      return fetch.commonApi('/workShift/deleteRecord', param)
    }
  }
}

export default workShift
