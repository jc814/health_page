import fetch from 'util/fetch'

const manage = {
  // 定义状态
  namespaced: true,
  actions: {
    selectManage ({commit}, param) {
      return fetch.commonApi('/manage/selectAllRecord', param)
    },
    updateManage ({commit}, param) {
      return fetch.commonApi('/manage/updateRecordById', param)
    },
    insertManage ({commit}, param) {
      return fetch.commonApi('/manage/insertRecord', param)
    },
    deleteManage ({commit}, param) {
      return fetch.commonApi('/manage/deleteRecord', param)
    },
    manageCreate ({commit}, param) {
      return fetch.commonApi('/manage/manageCreate', param)
    }
  }
}

export default manage
