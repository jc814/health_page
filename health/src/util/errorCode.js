const error = [
  {'6001': '没有检测到身份信息。'},
  {'6002': '身份信息被篡改，请重新登录'},
  {'6003': '会话过期，请重新登录。'},
  {'6004': '您不是管理员，无权访问，请重新登录'}
]
function getErrorMessag (code) {
  return error[code]
}

export default getErrorMessag
