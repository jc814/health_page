import fetch from 'util/fetch'

const office = {
  // 定义状态
  namespaced: true,
  actions: {
    selectSchedule ({commit}, param) {
      return fetch.commonApi('/schedule/selectRecord', param)
    },
    updateSchedule ({commit}, param) {
      return fetch.commonApi('/schedule/updateRecordById', param)
    },
    insertSchedule ({commit}, param) {
      return fetch.commonApi('/schedule/insertRecord', param)
    },
    deleteSchedule ({commit}, param) {
      return fetch.commonApi('/schedule/deleteRecord', param)
    }
  }
}

export default office
